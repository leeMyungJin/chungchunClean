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
        this.state = {
            data: getData(),
            newNodeContent: "My New Node"
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" initialized={this.initialized.bind(this)}></wjNav.TreeView>
                    </div>
                    <div className="col-xs-7">
                        <p>
                            New Node Content:
                            <input className="form-control" id="theInput" value={this.state.newNodeContent} onChange={this.setNewNodeContent.bind(this)}/>
                        </p>
                        <p>
                            Add Node:
                            <button id="btnFirst" className="btn btn-default" onClick={this.onFirstClick.bind(this)}>First Child</button>
                            <button id="btnLast" className="btn btn-default" onClick={this.onLastClick.bind(this)}>Last Child</button>
                        </p>
                        <p>
                            <button id="btnNoSel" className="btn btn-default" onClick={this.onNoSelClick.bind(this)}>Remove Selection</button>
                        </p>
                    </div>
                </div>
            </div>);
    }
    onFirstClick() {
        var control = this._control;
        var newItem = { header: document.getElementById("theInput").value }, node = control.selectedNode;
        if (node) {
            control.selectedNode = node.addChildNode(0, newItem);
        }
        else {
            control.selectedNode = control.addChildNode(0, newItem);
        }
    }
    onLastClick() {
        var control = this._control;
        var newItem = { header: document.getElementById("theInput").value }, node = control.selectedNode;
        if (node) {
            var index = node.nodes ? node.nodes.length : 0;
            control.selectedNode = node.addChildNode(index, newItem);
        }
        else {
            var index = control.nodes ? control.nodes.length : 0;
            control.selectedNode = control.addChildNode(index, newItem);
        }
    }
    onNoSelClick() {
        this._control.selectedNode = null;
    }
    initialized(control) {
        this._control = control;
        this._control.selectedItem = this._control.itemsSource[0];
    }
    setNewNodeContent(e) {
        this.setState({
            newNodeContent: e.target.value
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
