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
                <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" lazyLoadFunction={this.lazyLoadFunction.bind(this)}></wjNav.TreeView>
            </div>);
    }
    lazyLoadFunction(node, callback) {
        setTimeout(function () {
            // simulate http delay
            var result = [
                // simulate result
                { header: "Another lazy node...", items: [] },
                { header: "A non-lazy node without children" },
                {
                    header: "A non-lazy node with child nodes",
                    items: [{ header: "hello" }, { header: "world" }]
                }
            ];
            callback(result); // return result to control
        }, 2500); // 2.5sec http delay
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
