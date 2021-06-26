import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(100),
                rowFields: ['Country', 'Product'],
                valueFields: ['Sales', 'Expenses']
            }),
            sortOptions: 'Ascending,Descending'.split(','),
            sortOptions2: 'None,Ascending,Descending'.split(',')
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-4 panel">
                        <h4>
                            Sort Dimension fields
                        </h4>
                        <label>
                            Country: <wjInput.ComboBox itemsSource={this.state.sortOptions} selectedIndexChanged={this.onCountrySelectedIndexChanged.bind(this)}></wjInput.ComboBox>
                        </label>
                        <label>
                            Product: <wjInput.ComboBox itemsSource={this.state.sortOptions} selectedIndexChanged={this.onProductSelectedIndexChanged.bind(this)}></wjInput.ComboBox>
                        </label>
                        <h4>
                            Sort Measure fields
                        </h4>
                        <label>
                            Sales: <wjInput.ComboBox itemsSource={this.state.sortOptions2} initialized={this.initializeSortSales.bind(this)} selectedIndexChanged={this.updateMeasureSort.bind(this)}></wjInput.ComboBox>
                        </label>
                        <label>
                            Expenses: <wjInput.ComboBox itemsSource={this.state.sortOptions2} initialized={this.initializeSortExpenses.bind(this)} selectedIndexChanged={this.updateMeasureSort.bind(this)}></wjInput.ComboBox>
                        </label>
                        <label>
                            Subtotals: <input id="subtotals" type="checkbox" onClick={this.onSubtotalsClick.bind(this)}/>
                        </label>
                    </div>
                    <div className="col-xs-8">
                        <Olap.PivotGrid itemsSource={this.state.ng} initialized={this.initializePivotGrid.bind(this)}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
    initializePivotGrid(pivotGrid) {
        this.pivotGrid = pivotGrid;
    }
    initializeSortSales(combo) {
        this.sortSales = combo;
    }
    initializeSortExpenses(combo) {
        this.sortExpenses = combo;
    }
    onCountrySelectedIndexChanged(combo) {
        this.state.ng.fields.getField('Country').descending = combo.selectedIndex == 1;
    }
    onProductSelectedIndexChanged(combo) {
        this.state.ng.fields.getField('Product').descending = combo.selectedIndex == 1;
    }
    onSubtotalsClick(e) {
        this.state.ng.showRowTotals = e.target.checked ? wjcOlap.ShowTotals.Subtotals : wjcOlap.ShowTotals.GrandTotals;
    }
    updateMeasureSort() {
        let sd = this.state.ng.pivotView.sortDescriptions;
        sd.clear();
        this._addMeasureSort('Sales', this.sortSales.text);
        this._addMeasureSort('Expenses', this.sortExpenses.text);
    }
    _addMeasureSort(fieldName, sortDirection) {
        if (sortDirection != 'None') {
            let sd = this.state.ng.pivotView.sortDescriptions, cols = this.pivotGrid.columns;
            for (let c = 0; c < cols.length; c++) {
                let binding = cols[c].binding;
                if (binding.indexOf(fieldName) == 0) {
                    sd.push(new wjcCore.SortDescription(binding, sortDirection == 'Ascending'));
                }
            }
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
