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
            <p>This grid has a max-height set to 150 pixels:</p>
            <wjcGrid.FlexGrid itemsSource={this.state.data} style={{ maxHeight: "150px" }}></wjcGrid.FlexGrid>
            <p>
                And this grid is as tall as necessary to show all its
                content without vertical scrollbars:
            </p>
            <wjcGrid.FlexGrid itemsSource={this.state.data}></wjcGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
