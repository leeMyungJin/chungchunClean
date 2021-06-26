import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(200)
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid itemsSource={this.state.data} allowSorting={'MultiColumn'}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
