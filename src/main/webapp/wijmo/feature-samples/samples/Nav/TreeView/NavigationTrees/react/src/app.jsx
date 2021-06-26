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
            msg: "Ready"
        };
    }
    render() {
        return (<div className="container-fluid">
                <div id="msg" className="msg">{this.state.msg}</div>
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" itemClicked={this.onItemClicked.bind(this)}></wjNav.TreeView>
            </div>);
    }
    onItemClicked(s, e) {
        this.setState({
            msg: (<p>Navigating to <b>** {s.selectedItem.header} **</b> </p>)
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
