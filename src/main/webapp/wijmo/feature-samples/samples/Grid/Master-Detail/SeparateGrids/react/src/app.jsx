import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { CollectionView, Control, DateTime, isString } from "@grapecity/wijmo";
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { ComboBox, InputDate, InputNumber } from "@grapecity/wijmo.react.input";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: "US,Germany,UK,Japan,Italy,Greece".split(","),
            products: "Phones,Cars,Stereos,Watches,Computers".split(","),
            gridData: [],
            detailView: null
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                For example, the ComboBox below is used as a master control.
                Select a country from the combo and the grid below will show
                the items in that country:
            </p>
            <label>Select a country:
                <ComboBox initialized={this.initCountriesCombo.bind(this)} itemsSource={this.state.countries} selectedIndexChanged={this.onCountriesSelectedIndexChanged.bind(this)}/>
            </label>
            <FlexGrid itemsSource={this.state.detailView}/>
            <p>
                In the next example, The FlexGrid is used as the master control.
                Select an item on the grid and see the details in the controls below:
            </p>
            <h3>Master</h3>
            <FlexGrid initialized={this.initGridMaster.bind(this)} itemsSource={this.state.gridData} selectionMode={'Row'} isReadOnly={true} selectionChanged={this.onSelectionChanged.bind(this)}/>
            <h3>Detail</h3>
            <table className="tbl-spaced">
                <tr>
                    <td>Country:</td>
                    <td>
                        <ComboBox itemsSource={this.state.countries} className="bnd-ctl" id="theCountry" textChanged={this.setProperty.bind(this, 'country')}/>
                    </td>
                </tr>
                <tr>
                    <td>Product:</td>
                    <td>
                        <ComboBox itemsSource={this.state.products} className="bnd-ctl" id="theProduct" textChanged={this.setProperty.bind(this, 'product')}/>
                    </td>
                </tr>
                <tr>
                    <td>Date:</td>
                    <td>
                        <InputDate className="bnd-ctl" id="theDate" textChanged={this.setProperty.bind(this, 'date')}/>
                    </td>
                </tr>
                <tr>
                    <td>Sales:</td>
                    <InputNumber className="bnd-ctl" id="theSales" format="'n2'" step={10} valueChanged={this.setProperty.bind(this, 'sales')}/>
                </tr>
                <tr>
                    <td>Expenses:</td>
                    <InputNumber className="bnd-ctl" id="theExpenses" format="'n2'" step={10} valueChanged={this.setProperty.bind(this, 'expenses')}/>
                </tr>
            </table>
        </div>;
    }
    componentDidMount() {
        this.setState({
            gridData: this.getData(),
            detailView: new CollectionView(this.getData(), {
                filter: (item) => {
                    return item.country === this.countriesCombo.text;
                }
            })
        });
    }
    initCountriesCombo(countriesCombo) {
        this.countriesCombo = countriesCombo;
    }
    onCountriesSelectedIndexChanged() {
        this.state.detailView.refresh();
    }
    initGridMaster(theGridMaster) {
        this.theGridMaster = theGridMaster;
    }
    onSelectionChanged() {
        var item = this.theGridMaster.collectionView.currentItem;
        var bndCtls = document.querySelectorAll(".bnd-ctl");
        for (var i = 0; i < bndCtls.length; i++) {
            var host = bndCtls[i];
            var prop = host.id.substr(3).toLowerCase();
            var ctl = Control.getControl(host);
            if (isString(item[prop])) {
                ctl["text"] = item[prop];
            }
            else {
                ctl["value"] = item[prop];
            }
        }
    }
    setProperty(prop, sender) {
        var val = prop === "country" || prop === "product"
            ? sender.text
            : sender.value;
        var v = this.theGridMaster.collectionView;
        v.editItem(v.currentItem);
        v.currentItem[prop] = val;
        v.commitEdit();
    }
    getData() {
        var data = [], countries = this.state.countries, products = this.state.products;
        for (var i = 0; i < 50; i++) {
            data.push({
                id: i,
                country: countries[Math.floor(Math.random() * countries.length)],
                product: products[Math.floor(Math.random() * products.length)],
                date: DateTime.addDays(new Date(), i),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
