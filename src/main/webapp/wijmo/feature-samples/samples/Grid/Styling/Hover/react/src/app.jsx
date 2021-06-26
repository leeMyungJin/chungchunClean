import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <h2>Hover on Cells</h2>
            <div id="hoverCell">
                <wjcGrid.FlexGrid itemsSource={this.state.data}></wjcGrid.FlexGrid>
            </div>
            <h2>Hover on Rows</h2>
            <div id="hoverRow">
                <wjcGrid.FlexGrid itemsSource={this.state.data}></wjcGrid.FlexGrid>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
