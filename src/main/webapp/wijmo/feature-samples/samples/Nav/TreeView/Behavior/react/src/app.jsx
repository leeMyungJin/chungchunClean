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
        this.state = getData();
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div id="properties"></div>
                        <button id="btnCollapse" className="btn btn-default" onClick={this.onTreeCollapsedLoadedItems.bind(this)}>Collapse All</button>
                        <button id="btnExpand" className="btn btn-default" onClick={this.onTreeExpandedLoadedItems.bind(this)}>Expand All</button>
                    </div>
                    <div className="col-xs-6">
                        <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" initialized={(control) => this._treeView = control}>
                        </wjNav.TreeView>
                    </div>
                </div>
            </div>);
    }
    onTreeCollapsedLoadedItems(s, e) {
        this._treeView.collapseToLevel(0);
    }
    onTreeExpandedLoadedItems(s, e) {
        this._treeView.collapseToLevel(100000);
    }
    componentDidMount() {
        var prps = 'allowDragging,autoCollapse,expandOnClick,isAnimated,isReadOnly,showCheckboxes'.split(','), host = document.getElementById('properties'), tpl = '<label><input id="{prop}" type="checkbox"> {prop}</label>';
        prps.forEach((prop) => {
            var el = wjCore.createElement(tpl.replace(/\{prop\}/g, prop), host);
            el.querySelector('input').checked = this._treeView[prop];
        });
        host.addEventListener('click', (e) => {
            if (e.target instanceof HTMLInputElement) {
                this._treeView[e.target.id] = e.target.checked;
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
