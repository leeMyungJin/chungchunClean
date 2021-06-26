import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._wjTreeViewControl = null;
        this._treeViewData = getData();
        this.state = {
            data: this._treeViewData,
            autoCompleteData: this.getSearchList(this._treeViewData, null, null)
        };
    }
    render() {
        return (<div className="container-fluid">
                <label htmlFor="search">Search: </label>
                <wjInput.AutoComplete itemsSource={this.state.autoCompleteData} selectedIndex={-1} displayMemberPath="path" searchMemberPath="keywords" selectedIndexChanged={this.onSelectedIndexChanged.bind(this)}>
                </wjInput.AutoComplete>
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" initialized={this.initTreeView.bind(this)}>
                </wjNav.TreeView>
            </div>);
    }
    initTreeView(ctl) {
        this._wjTreeViewControl = ctl;
    }
    onSelectedIndexChanged(s) {
        if (s.selectedItem) {
            this._wjTreeViewControl.selectedItem = s.selectedItem.item;
        }
    }
    getSearchList(items, searchList, path) {
        // set defaults
        if (searchList == null)
            searchList = [];
        if (path == null)
            path = '';
        // add items and sub-items
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            searchList.push({
                item: item,
                path: path + item.header,
                keywords: item.keywords
            });
            if (item.items) {
                this.getSearchList(item.items, searchList, path + item.header + ' / ');
            }
        }
        return searchList;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
