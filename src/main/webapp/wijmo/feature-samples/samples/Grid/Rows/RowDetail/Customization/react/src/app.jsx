import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
import * as wjOdata from '@grapecity/wijmo.odata';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._catToProductMap = new Map();
        //
        this.rowHasDetailFn = row => !(row.dataItem.CategoryID % 2);
        this.state = {
            categories: [],
            products: [],
        };
        this.rowDetailRef = React.createRef();
    }
    //
    render() {
        return (<div className="container-fluid">
                <h3>Using custom elements to show or hide details</h3>
                <p>
                    This grid shows product categories on each row with custom show/hide elements. Expanding
                    the rows shows an HTML element with information about
                    the products in that category:
                </p>
                <FlexGrid id="customDetail" itemsSource={this.state.categories} isReadOnly headersVisibility="Column" selectionMode="Row">
                    <FlexGridDetail ref={this.rowDetailRef} isAnimated rowHasDetail={this.rowHasDetailFn} detailVisibilityMode="Code" template={ctx => (<React.Fragment>
                                ID: <b>{ctx.item.CategoryID}</b><br />
                                Name: <b>{ctx.item.CategoryName}</b><br />
                                Description: <b>{ctx.item.Description}</b><br />
                                <button className="btn btn-default btn-xs" onClick={this.hideDetail.bind(this, ctx.row)}>Hide Detail</button>
                            </React.Fragment>)}/>
                    <FlexGridColumn header="Category Name" binding="CategoryName" isReadOnly width="*">
                        <FlexGridCellTemplate cellType="Cell" template={ctx => (<React.Fragment>
                                    {!this.isDetailAvailable(ctx.row)
            ? <span className="glyphicon"/>
            : null}
                                    {this.isDetailAvailable(ctx.row) && this.isDetailVisible(ctx.row)
            ? <span className="glyphicon glyphicon-chevron-up" onClick={this.hideDetail.bind(this, ctx.row)}/>
            : null}
                                    {this.isDetailAvailable(ctx.row) && !this.isDetailVisible(ctx.row)
            ? <span className="glyphicon glyphicon-chevron-down" onClick={this.showDetail.bind(this, ctx.row)}/>
            : null}
                                    {ctx.item.CategoryName} (ID: {ctx.item.CategoryID})
                                </React.Fragment>)}/>
                    </FlexGridColumn>
                    <FlexGridColumn header="Description" binding="Description" width="2*"/>
                </FlexGrid>
            </div>);
    }
    //
    componentDidMount() {
        const url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.setState({
            categories: new wjOdata.ODataCollectionView(url, 'Categories', {
                fields: ['CategoryID', 'CategoryName', 'Description']
            }),
            products: new wjOdata.ODataCollectionView(url, 'Products'),
        });
        this._rowDetail = this.rowDetailRef.current.control;
    }
    //
    getProducts(categoryID) {
        let categoryProducts = this._catToProductMap.get(categoryID);
        if (!categoryProducts) {
            categoryProducts = this.state.products.items.filter((product) => product.CategoryID === categoryID);
            this._catToProductMap.set(categoryID, categoryProducts);
        }
        return categoryProducts;
    }
    //
    isDetailAvailable(row) {
        return this._rowDetail.isDetailAvailable(row);
    }
    //
    isDetailVisible(row) {
        return this._rowDetail.isDetailVisible(row);
    }
    //
    hideDetail(row) {
        return this._rowDetail.hideDetail(row);
    }
    //
    showDetail(row) {
        return this._rowDetail.showDetail(row, true);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
