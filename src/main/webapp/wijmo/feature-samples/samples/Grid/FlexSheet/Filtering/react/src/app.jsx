import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
import { getData, getCountries, getProducts } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(50),
            products: getProducts(),
            countries: getCountries(),
            flex: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Country" itemsSource={this.state.data}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <button onClick={this.showFilter.bind(this)} type="button" className="btn btn-default">Show Filter</button>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            let column = flex.columns.getColumn("countryId");
            if (column && !column.dataMap) {
                column.dataMap = this._buildDataMap(this.state.countries);
            }
            column = flex.columns.getColumn("productId");
            if (column && !column.dataMap) {
                column.dataMap = this._buildDataMap(this.state.products);
            }
            column = flex.columns.getColumn("amount");
            if (column) {
                column.format = "c2";
            }
        });
        this.setState({
            flex: flex
        });
    }
    showFilter() {
        this.state.flex.showColumnFilter();
    }
    _buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjcGrid.DataMap(map, "key", "value");
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
