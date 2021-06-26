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
            selectionMsg: null,
            clickMsg: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" itemClicked={this.onItemClicked.bind(this)} selectedItemChanged={this.onSelectedItemChanged.bind(this)}>
                </wjNav.TreeView>
                <div id="selection">
                    {this.state.selectionMsg}
                </div>
                <div id="click">
                    {this.state.clickMsg}
                </div>
            </div>);
    }
    onSelectedItemChanged(s, e) {
        this.setState({
            selectionMsg: (<p> You selected item <b>{s.selectedItem.header}</b></p>)
        });
    }
    onItemClicked(s, e) {
        this.setState({
            clickMsg: (<p> You clicked item <b>{s.selectedItem.header}</b></p>)
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
