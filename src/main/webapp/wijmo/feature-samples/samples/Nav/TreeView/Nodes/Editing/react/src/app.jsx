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
                <wjNav.TreeView itemsSource={this.state} displayMemberPath="header" childItemsPath="items" isReadOnly={false} nodeEditStarting={this.onNodeEditStarting.bind(this)}></wjNav.TreeView>
            </div>);
    }
    onNodeEditStarting(s, e) {
        if (e.node.hasChildren) {
            e.cancel = true;
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
