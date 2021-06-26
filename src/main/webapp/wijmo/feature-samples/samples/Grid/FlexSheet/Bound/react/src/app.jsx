import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
import { getData, countries, products } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(50),
            countries: countries,
            products: products
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet id="sample-sheet" initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Country" itemsSource={this.state.data}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            let column = flex.columns.getColumn("countryId");
            if (column && !column.dataMap) {
                column.dataMap = this.buildDataMap(this.state.countries);
            }
            column = flex.columns.getColumn("productId");
            if (column && !column.dataMap) {
                column.dataMap = this.buildDataMap(this.state.products);
            }
            column = flex.columns.getColumn("amount");
            if (column) {
                column.format = "c2";
            }
        });
    }
    // build a data map from a string array using the indices as keys
    buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjcGrid.DataMap(map, "key", "value");
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
