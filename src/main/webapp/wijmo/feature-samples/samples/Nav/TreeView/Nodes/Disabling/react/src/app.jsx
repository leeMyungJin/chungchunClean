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
                <button id="btnDisableNode" className="btn btn-default" onClick={this.onDisableNodeClick.bind(this)}>Disable Selected Node</button>
                <button id="btnEnableAllNodes" className="btn btn-default" onClick={this.onEnableAllNodes.bind(this)}>Enable All Nodes</button>
                <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" initialized={this.initialized.bind(this)}></wjNav.TreeView>
            </div>);
    }
    onDisableNodeClick() {
        var nd = this._control.selectedNode;
        if (nd) {
            nd.isDisabled = true;
        }
    }
    onEnableAllNodes() {
        for (var nd = this._control.getFirstNode(); nd; nd = nd.next()) {
            nd.isDisabled = false;
        }
    }
    initialized(control) {
        this._control = control;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
