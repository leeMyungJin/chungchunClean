import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { Popup, ComboBox, InputNumber } from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData(),
            editItem: null
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid isReadOnly={true} selectionMode="Row" initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" isRequired={true} dataMap="countries"/>
                <FlexGridColumn binding="sales" header="Sales" format="n2"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="n2"/>
            </FlexGrid>

            <Popup className="modal-content" initialized={this.initializePopup.bind(this)}>
                <div className="modal-header">
                    <button className="close wj-hide">
                        &times;
                    </button>
                    <h4 className="modal-title">Edit Item {this.state.editItem != null ? this.state.editItem.id : ''}</h4>
                </div>

                <div className="modal-body">
                    <div className="wj-labeled-input">
                        <ComboBox initialized={this.initializeCountry.bind(this)} id="country" itemsSource={this.countries}/>
                        <label>Country</label>
                    </div>


                </div>

                <div className="wj-labeled-input">
                    <InputNumber initialized={this.initializeSales.bind(this)} id="sales" format="n2" min={0} step={100}/>
                    <label>Sales</label>
                </div>

                <div className="wj-labeled-input">
                    <InputNumber initialized={this.initializeExpense.bind(this)} id="expenses" format="'n2'" min={0} step={100}/>
                    <label>Expenses</label>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-primary wj-hide-ok">OK</button>
                    <button className="btn btn-default wj-hide">Cancel</button>
                </div>
            </Popup>
        </div>;
    }
    initializeGrid(flex) {
        var _this = this;
        // add 'edit button' to row header cells
        flex.formatItem.addHandler((s, e) => {
            if (e.panel == s.rowHeaders && e.col == 0) {
                e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
            }
        });
        // handle button clicks
        flex.addEventListener(flex.hostElement, 'click', (e) => {
            let ht = flex.hitTest(e);
            if (ht.panel == flex.rowHeaders) {
                // prepare form
                let editItem = flex.rows[ht.row].dataItem;
                _this.cboCountry.selectedItem = editItem.country;
                _this.numberSales.value = editItem.sales;
                _this.numberExpenses.value = editItem.expenses;
                this.setState({ editItem: editItem });
                // show the form
                _this.popup.show(true, (s) => {
                    if (s.dialogResult == 'wj-hide-ok') {
                        // commit changes if the user pressed the OK button
                        (flex.collectionView).editItem(editItem);
                        editItem.country = _this.cboCountry.selectedValue;
                        editItem.sales = _this.numberSales.value;
                        editItem.expenses = _this.numberExpenses.value;
                        (flex.collectionView).commitEdit();
                    }
                    // return focus to the grid
                    flex.focus();
                    this.setState({ editItem: null });
                });
            }
        });
    }
    initializePopup(ctl) {
        this.popup = ctl;
    }
    initializeExpense(ctl) {
        this.numberExpenses = ctl;
    }
    initializeSales(ctl) {
        this.numberSales = ctl;
    }
    initializeCountry(ctl) {
        this.cboCountry = ctl;
    }
    getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
