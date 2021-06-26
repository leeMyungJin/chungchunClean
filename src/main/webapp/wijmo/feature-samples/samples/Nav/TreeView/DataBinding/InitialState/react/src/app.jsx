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
                <wjNav.TreeView itemsSource={this.state}></wjNav.TreeView>

                <h2>Selecting a default item</h2>
                <p>
                    If you select an item when the tree loads, it will
                    automatically ensure the selected node is visible,
                    expanding the tree and scrolling as needed.
                    In this case, we selected the 'Solar Panel' item:
                </p>
                <wjNav.TreeView itemsSource={this.state} loadedItems={this.theTreeSelectedLoadedItems.bind(this)}></wjNav.TreeView>

                <h2>Collapsing to a given Level</h2>
                <p>
                    Use the
                    <b>collapseToLevel</b> method to collapse or expand
                    the tree to a given level when it loads. For example, the
                    trees below start totally collapsed and totally expanded:
                </p>
                <wjNav.TreeView itemsSource={this.state} loadedItems={this.onTreeCollapsedLoadedItems.bind(this)}></wjNav.TreeView>
                <wjNav.TreeView itemsSource={this.state} loadedItems={this.onTreeExpandedLoadedItems.bind(this)}></wjNav.TreeView>
            </div>);
    }
    theTreeSelectedLoadedItems(s, e) {
        s.selectedItem = this.findItem(s.itemsSource, "Solar Panel");
    }
    onTreeCollapsedLoadedItems(s, e) {
        s.collapseToLevel(0);
    }
    onTreeExpandedLoadedItems(s, e) {
        s.collapseToLevel(10);
    }
    findItem(items, str) {
        for (var i = 0; items && i < items.length; i++) {
            if (items[i].header.indexOf(str) !== -1) {
                return items[i];
            }
            var result = this.findItem(items[i].items, str);
            if (result) {
                return result;
            }
        }
        return null;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
