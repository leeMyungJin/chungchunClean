import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
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
            <p>
                This example shows how you can use a <b>flex</b> layout 
                within the cells to center the content vertically:
            </p>
            <FlexGrid allowResizing={wjGrid.AllowResizing.Both} deferResizing={true} itemsSource={this.state.data} initialized={s => {
            s.rows.defaultSize = 45;
            s.columnHeaders.rows.defaultSize = 65;
        }}>
                <FlexGridColumn binding="id" header="ID" width={50}/>
                <FlexGridColumn binding="country" header="Country"/>
                <FlexGridColumn binding="product" header="Product"/>
                <FlexGridColumn binding="sales" header="Sales" format="c0"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="c0"/>
                <FlexGridColumn binding="active" header="Active"/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
