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
            scanResult: []
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" initialized={this.initTreeView.bind(this)} loadedItems={this.itemsLoaded.bind(this)}></wjNav.TreeView>
                    </div>
                    <div className="col-xs-7">
                        <div id="scan" className="btn btn-primary" onClick={this.scanNode.bind(this)}>
                            Scan Visible Nodes
                        </div>
                        <h4>
                            Visible Nodes:
                        </h4>
                        <div id="result">{this.state.scanResult}</div>
                    </div>
                </div>
            </div>);
    }
    initTreeView(ctl) {
        this._wjTreeViewControl = ctl;
    }
    scanNode(s) {
        this.scan(true);
    }
    scan(visible) {
        let result = [], cnt = 0;
        for (let node = this._wjTreeViewControl.nodes[0]; node; node = node.next(visible)) {
            cnt++;
            result.push(<p></p>);
            result.push(<span className="node-info">
                {node.dataItem.header}
                (level: {node.level}, index: {node.index}, isCollapsed: {node.isCollapsed.toString()})
            </span>);
            result.push(<br />);
        }
        this.setState({
            scanResult: result
        });
    }
    itemsLoaded() {
        this.scan(true);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
