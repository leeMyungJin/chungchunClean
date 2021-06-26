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
            tvChkStatus: null,
            checkedItems: []
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" showCheckboxes={true} checkedItemsChanged={this.onCheckedItemsChanged.bind(this)} initialized={this.initTreeView.bind(this)}></wjNav.TreeView>

                <button id="btnCheckAll" className="btn btn-default" onClick={this.onCheckAllClick.bind(this)}>
                    Check All
                </button>
                <button id="btnUncheckAll" className="btn btn-default" onClick={this.onUncheckAllClick.bind(this)}>
                    Uncheck All
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button id="btnSaveState" className="btn btn-default" onClick={this.onSaveStateClick.bind(this)}>
                    Save State
                </button>
                <button id="btnRestoreState" className="btn btn-default" onClick={this.onRestoreStateClick.bind(this)}>
                    Restore State
                </button>
                <div id="tvChkStatus">{this.state.tvChkStatus}</div>
            </div>);
    }
    initTreeView(ctl) {
        this._wjTreeViewControl = ctl;
    }
    onCheckedItemsChanged() {
        let items = this._wjTreeViewControl.checkedItems, msg = [], li = [];
        if (items.length) {
            for (let i = 0; i < items.length; i++) {
                li.push((<li> {items[i].header} </li>));
            }
            msg.push(<p><b>Checked Items:</b></p>);
            msg.push(<ol>{li}</ol>);
        }
        this.setState({
            tvChkStatus: msg
        });
    }
    onCheckAllClick() {
        this._wjTreeViewControl.checkAllItems(true);
    }
    onUncheckAllClick() {
        this._wjTreeViewControl.checkAllItems(false);
    }
    onSaveStateClick() {
        this.setState({
            checkedItems: this._wjTreeViewControl.checkedItems || []
        });
    }
    onRestoreStateClick() {
        this._wjTreeViewControl.checkedItems = this.state.checkedItems;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
