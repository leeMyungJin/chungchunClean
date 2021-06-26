import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: getData(),
            hideColsGridData: null
        };
    }
    render() {
        return <div className="container-fluid">
            <p>This example groups the data by country and by product:</p>
            <wjGrid.FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.gridData}>
            </wjGrid.FlexGrid>
            <p>
                This example groups the data by country and product, and
                hides those columns to achieve a cleaner appearance:
            </p>
            <wjGrid.FlexGrid initialized={this.initializeHideColsGrid.bind(this)} itemsSource={this.state.hideColsGridData}>
                <wjGrid.FlexGridColumn binding="country" header="Country" visible={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="product" header="Product" visible={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="downloads" header="Downloads" width="*"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" width="*"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" width="*"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid> 
        </div>;
    }
    initializeGrid(grid) {
        grid.select(new wjcGrid.CellRange(0, 0), true);
    }
    initializeHideColsGrid(hideColsGrid) {
        setTimeout(() => {
            hideColsGrid.select(new wjcGrid.CellRange(0, 2), true);
        });
    }
    componentDidMount() {
        let data = getData();
        this.setState({
            gridData: new wjcCore.CollectionView(data, {
                sortDescriptions: ["country", "product"],
                groupDescriptions: ["country", "product"]
            }),
            hideColsGridData: new wjcCore.CollectionView(data, {
                sortDescriptions: ["country", "product"],
                groupDescriptions: ["country", "product"]
            })
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
