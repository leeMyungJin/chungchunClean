import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getData();
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" initialized={this.initialized.bind(this)}>
                        </wjNav.TreeView>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-default" onClick={this.onItemDataClick.bind(this)}>Refresh with given item data</button>
                        <br />
                        <button className="btn btn-default" onClick={this.onItemSourceClick.bind(this)}>Refresh with changed itemsSource</button>
                        <br />
                        <button className="btn btn-default" onClick={this.onReloadClick.bind(this)}>Re-load the TreeView</button>
                    </div>
                </div>
            </div>);
    }
    initialized(sender) {
        this._control = sender;
        this._control.selectedItem = this._control.itemsSource[0];
    }
    onItemDataClick() {
        this._control.selectedNode.refresh({
            header: 'given itemData ' + Date.now(),
            items: [
                { header: 'first child' },
                { header: 'second child' }
            ]
        });
    }
    onItemSourceClick() {
        let node = this._control.selectedNode, arr = node.itemsSource;
        //
        arr[node.index] = {
            header: 'updated itemData ' + Date.now(),
            items: [
                { header: 'first child' },
                { header: 'second child' }
            ]
        };
        //
        node.refresh();
    }
    onReloadClick() {
        this._control.loadTree(true);
        this._control.selectedItem = this._control.itemsSource[0];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
