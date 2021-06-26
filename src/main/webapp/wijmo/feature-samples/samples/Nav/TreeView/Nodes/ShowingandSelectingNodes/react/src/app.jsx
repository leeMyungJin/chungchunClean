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
            theItem: null,
            theNode: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <button id="btnShow" className="btn btn-primary" onClick={this.onShowNode.bind(this)}>
                    Show 'Work Table' Node
                </button>
                &nbsp;
                <button id="btnSelect" className="btn btn-primary" onClick={this.onSelectNode.bind(this)}>
                    Select 'Work Table' Node
                </button>
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" initialized={this.initTreeView.bind(this)}></wjNav.TreeView>
            </div>);
    }
    initTreeView(ctl) {
        let item = this.findItem(ctl.itemsSource, 'Work Table');
        this.setState({
            theItem: item,
            theNode: ctl.getNode(item)
        });
    }
    onShowNode() {
        this.state.theNode.ensureVisible();
    }
    onSelectNode() {
        this.state.theNode.select();
    }
    findItem(items, text) {
        var node = null;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.header == text) {
                return item;
            }
            if (item.items) {
                item = this.findItem(item.items, text);
                if (item) {
                    return item;
                }
            }
        }
        return null; //  not found
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
