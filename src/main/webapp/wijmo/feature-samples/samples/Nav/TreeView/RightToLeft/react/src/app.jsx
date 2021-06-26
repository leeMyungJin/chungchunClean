import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { TreeView } from '@grapecity/wijmo.react.nav';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return (<div className="container-fluid">
                <TreeView dir="rtl" displayMemberPath="header" childItemsPath="items" itemsSource={this.state.data}/>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
