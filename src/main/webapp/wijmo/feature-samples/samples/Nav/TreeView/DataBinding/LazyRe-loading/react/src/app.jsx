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
                <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" isContentHtml={true} allowDragging={true} expandOnClick={false} autoCollapse={false} lazyLoadFunction={this.lazyLoadFunction.bind(this)}></wjNav.TreeView>
            </div>);
    }
    lazyLoadFunction(node, callback) {
        var self = this;
        setTimeout(function () {
            var result = self.getLazyData();
            callback(result);
        }, 1000);
    }
    getLazyData() {
        var creationTime = wjCore.Globalize.format(new Date(), "hh:mm:ss");
        var emptyArray = [];
        return [
            { header: "Empty Node at: " + creationTime },
            {
                header: "Node with child nodes at: " + creationTime,
                items: [{ header: "hello" }, { header: "world" }]
            },
            {
                header: "Lazy node <i>(reload when opening)</i>",
                items: emptyArray,
                reload: true
            }
        ];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
