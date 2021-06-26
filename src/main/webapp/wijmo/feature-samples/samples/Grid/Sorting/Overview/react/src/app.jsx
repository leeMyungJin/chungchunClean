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
            <wjcGrid.FlexGrid deferResizing={true} itemsSource={this.state.data}>
                <wjcGrid.FlexGridColumn binding="id" header="ID" width={60} allowSorting={false}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="country" header="Country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
