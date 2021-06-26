import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { toggleClass, isNumber } from "@grapecity/wijmo";
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
            <p>This grid shows the effect of these properties:</p>
            <FlexGrid alternatingRowStep={0} autoGenerateColumns={false} itemsSource={this.state.data} initialized={this.initialGrid.bind(this)}>
                <FlexGridColumn binding="id" header="ID" align="center" width={50}/>
                <FlexGridColumn binding="country" header="Country" cssClass="cell-country"/>
                <FlexGridColumn binding="product" header="Product" cssClass="cell-product"/>
                <FlexGridColumn binding="comment" header="Comment" wordWrap={true} width={200}/>
                <FlexGridColumn binding="sales" header="Sales" align="center" format="c0"/>
                <FlexGridColumn binding="expenses" header="Expenses" align="center" format="c0"/>
            </FlexGrid>

            <p>
                The grid below uses <b>formatItem</b> to add class names to numeric cells
                so their style depends on their values:</p>
            <FlexGrid alternatingRowStep={0} autoGenerateColumns={false} formatItem={this.onFormatItem.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="country" header="Country"/>
                <FlexGridColumn binding="product" header="Product"/>
                <FlexGridColumn binding="sales" header="Sales" align="center" format="c0"/>
                <FlexGridColumn binding="expenses" header="Expenses" align="center" format="c0"/>
            </FlexGrid>
        </div>;
    }
    componentDidMount() {
        this.grid.autoSizeRows();
    }
    initialGrid(grid) {
        this.grid = grid;
    }
    onFormatItem(flexGrid, e) {
        if (e.panel == flexGrid.cells) {
            let value = e.panel.getCellData(e.row, e.col, false);
            toggleClass(e.cell, 'high-value', isNumber(value) && value > 6000);
            toggleClass(e.cell, 'low-value', isNumber(value) && value < 2000);
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
