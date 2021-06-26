import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { Firestore } from '@grapecity/wijmo.cloud';
import { DataMap } from '@grapecity/wijmo.grid';
import { ComboBox } from '@grapecity/wijmo.react.input';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { FlexChart, FlexChartLegend, FlexChartAxis, FlexChartSeries } from '@grapecity/wijmo.react.chart';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        // create the Firestore data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const PROJECT_ID = 'test-9c0be';
        let fireStore = new Firestore(PROJECT_ID, API_KEY, {
            collections: ['Products', 'Categories', 'Suppliers']
        });
        // expose categories, products, supplier map
        this.state = {
            categories: fireStore.getCollection('Categories'),
            products: fireStore.getCollection('Products'),
            supplierMap: new DataMap(fireStore.getCollection('Suppliers'), 'SupplierID', 'CompanyName')
        };
    }
    // update product filter when selected category changes
    categoryChanged(categoryCombo) {
        let cat = categoryCombo.selectedItem;
        this.state.products.filter = item => {
            return cat == null || cat.CategoryID == item.CategoryID;
        };
    }
    render() {
        return <div className='container-fluid'>
            <label>
                Category{' '}
                <ComboBox placeholder="(All Categories)" displayMemberPath="CategoryName" isRequired={false} selectedIndexChanged={s => this.categoryChanged(s)} itemsSource={this.state.categories}/>
            </label>
            <div className="row">
                <div className="col-sm-6">
                    <FlexGrid selectionMode="MultiRange" showMarquee={true} isReadOnly={true} itemsSource={this.state.products}>
                        <FlexGridColumn binding="ProductName" header="Product Name" width={200}/>
                        <FlexGridColumn binding="UnitPrice" header="Unit Price" format="n2"/>
                        <FlexGridColumn binding="QuantityPerUnit" header="Quantity Per Unit" width={150}/>
                        <FlexGridColumn binding="SupplierID" header="Supplier" dataMap={this.state.supplierMap} width={200}/>
                        <FlexGridColumn binding="UnitsInStock" header="In Stock" format="n0"/>
                        <FlexGridColumn binding="UnitsOnOrder" header="On Order" format="n0"/>
                    </FlexGrid>
                </div>
                <div className="col-sm-6">
                    <FlexChart chartType="Bar" bindingX="ProductName" itemsSource={this.state.products}>
                        <FlexChartLegend position="Bottom"/>
                        <FlexChartAxis wjProperty="axisX" majorGrid={true} axisLine={false}/>
                        <FlexChartAxis wjProperty="axisY" majorGrid={false} axisLine={false} reversed={true}/>
                        <FlexChartSeries binding="UnitPrice" name="Product Unit Prices (US$)"/>
                    </FlexChart>
                </div>
            </div>
        </div>;
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
