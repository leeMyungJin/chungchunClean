import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { GroupPanel } from "@grapecity/wijmo.react.grid.grouppanel";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            flex: null
        };
    }
    render() {
        return <div className="container-fluid">
            <GroupPanel className="group-panel" grid={this.state.flex} placeholder="Drag columns here to create groups"/>

            <FlexGrid initialized={this.initialized.bind(this)} itemsSource={this.state.data}/>
        </div>;
    }
    initialized(ctl) {
        this.setState({
            flex: ctl
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
