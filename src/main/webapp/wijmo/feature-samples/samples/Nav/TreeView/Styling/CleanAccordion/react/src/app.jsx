import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._wjTreeViewControl = null;
        this._itemTemplate = '<div class="item">' +
            '<b>{city}</b> ({state})<br/>' +
            '{address}<br/>' +
            'Phone: <b>{phone}</b><br/>' +
            'Fax: <b>{fax}</b><br/>' +
            'Website: <a href="{site}">{site}</a><br/>' +
            '</div>';
        this.state = this.getTreeData(getData());
    }
    render() {
        return (<div className="container-fluid">
                <p>
                    Selected item: <b><span id="selected"></span></b>
                </p>
                <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="detail" formatItem={this.onFormatItem.bind(this)} selectedItemChanged={this.onSelectedItemChanged.bind(this)} initialized={this.initTreeView.bind(this)}></wjNav.TreeView>
            </div>);
    }
    initTreeView(ctl) {
        this._wjTreeViewControl = ctl;
    }
    onFormatItem(s, e) {
        switch (e.level) {
            //
            // level 0: wrap header in an H1 tag
            case 0:
                e.element.innerHTML = '<h1>' + e.dataItem.header + '<h1>';
                break;
            //
            // level 1: use template to create details
            case 1:
                var html = wjCore.format(this._itemTemplate, e.dataItem, function (data, name, fmt, val) {
                    if (wjCore.isString(data[name])) {
                        val = wjCore.escapeHtml(data[name]);
                    }
                    return val;
                });
                e.element.innerHTML = html;
                break;
        }
    }
    onSelectedItemChanged() {
        var node = this._wjTreeViewControl.selectedNode;
        if (node && node.parentNode) {
            node = this._wjTreeViewControl.selectedNode = node.parentNode;
        }
        node.isCollapsed = false;
        document.getElementById('selected').textContent = node.dataItem.header;
    }
    getTreeData(data) {
        var treeData = [];
        for (var i = 0; i < data.length; i++) {
            treeData.push({
                header: data[i].name,
                detail: [data[i]]
            });
        }
        return treeData;
    }
    componentDidMount() {
        this._wjTreeViewControl.selectedItem = this._wjTreeViewControl.itemsSource[0];
        document.getElementById('selected').textContent = this._wjTreeViewControl.selectedNode.dataItem.header;
        this._wjTreeViewControl.hostElement.addEventListener("keydown", function (e) {
            var node = null;
            switch (e.keyCode) {
                case wjCore.Key.Up:
                    node = this._wjTreeViewControl.selectedNode.previousSibling();
                    break;
                case wjCore.Key.Down:
                    node = this._wjTreeViewControl.selectedNode.nextSibling();
                    break;
            }
            if (node) {
                this._wjTreeViewControl.selectedNode = node;
                document.getElementById('selected').textContent = node.dataItem.header;
                e.preventDefault();
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
