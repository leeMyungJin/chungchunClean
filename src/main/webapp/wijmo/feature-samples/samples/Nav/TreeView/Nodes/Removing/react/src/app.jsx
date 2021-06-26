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
                    <div className="col-xs-4">
                        <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" selectedItemChanged={this.onSelectedItemChanged.bind(this)} initialized={this.initialized.bind(this)}></wjNav.TreeView>
                    </div>
                    <div className="col-xs-8">
                        <button id="btnRemove" className="btn btn-default" onClick={this.onRemoveClick.bind(this)}>Remove Selected Node</button>
                    </div>
                </div>
            </div>);
    }
    initialized(control) {
        this._control = control;
        this._control.selectedItem = this._control.itemsSource[0];
    }
    onSelectedItemChanged() {
        var btn = document.getElementById("btnRemove");
        wjCore.setAttribute(btn, "disabled", this._control.selectedItem ? null : "disabled");
    }
    onRemoveClick() {
        var control = this._control;
        if (control.selectedItem) {
            // find the array that contains the item to be removed
            var parent = control.selectedNode.parentNode;
            var arr = parent
                ? parent.dataItem[control.childItemsPath]
                : control.itemsSource;
            // remove the item from the parent collection
            var index = arr.indexOf(control.selectedItem);
            arr.splice(index, 1);
            // refresh the tree
            control.loadTree();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
