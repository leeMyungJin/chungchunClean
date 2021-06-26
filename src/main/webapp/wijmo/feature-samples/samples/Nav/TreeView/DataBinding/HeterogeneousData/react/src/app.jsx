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
            path: "continent,country,city".split(","),
            items: "countries,cities".split(",")
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath={this.state.path} childItemsPath={this.state.items}></wjNav.TreeView>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
