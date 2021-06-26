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
            <h3>
                Default Cell Padding: 3px
            </h3>
            <wjcGrid.FlexGrid itemsSource={this.state.data}/>

            <h3>
                Custom Cell Padding: 8px
            </h3>
            <wjcGrid.FlexGrid id="theGridTallRows" itemsSource={this.state.data}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
