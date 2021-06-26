import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjOdata from '@grapecity/wijmo.odata';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._catToProductMap = new Map();
        this.state = {
            categories: [],
            products: [],
        };
    }
    componentDidMount() {
        const url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.setState({
            categories: new wjOdata.ODataCollectionView(url, 'Categories', {
                fields: ['CategoryID', 'CategoryName', 'Description']
            }),
            products: new wjOdata.ODataCollectionView(url, 'Products'),
        });
    }
    getProducts(categoryID) {
        let categoryProducts = this._catToProductMap.get(categoryID);
        if (!categoryProducts) {
            categoryProducts = this.state.products.items.filter((product) => product.CategoryID === categoryID);
            this._catToProductMap.set(categoryID, categoryProducts);
        }
        return categoryProducts;
    }
    render() {
        return <div className="container-fluid">
            <h3>HTML in Row Details</h3>
            <p>
                This grid shows product categories on each row. Expanding
                the rows shows an HTML element with information about
                the products in that category:
            </p>
            <FlexGrid itemsSource={this.state.categories} isReadOnly>
                <FlexGridColumn header="Category Name" binding="CategoryName" width="*"/>
                <FlexGridColumn header="Description" binding="Description" width="2*"/>
                <FlexGridDetail isAnimated template={ctx => <React.Fragment>
                        ID: <b>{ctx.item.CategoryID}</b><br />
                        Name: <b>{ctx.item.CategoryName}</b><br />
                        Description: <b>{ctx.item.Description}</b><br />
                        <ol>
                            {this.getProducts(ctx.item.CategoryID)
            .map(p => <li key={p.ProductID}>{p.ProductName}</li>)}
                        </ol>
                    </React.Fragment>}/>
            </FlexGrid>

            <h3>Grids in Row Details</h3>
            <p>
                You can add anything you want to the detail rows,
                including other grids. This example shows the same
                categories, but the detail row uses another grid
                to show the products:
            </p>
            <FlexGrid itemsSource={this.state.categories} isReadOnly>
                <FlexGridColumn header="Category Name" binding="CategoryName" width="*"/>
                <FlexGridColumn header="Description" binding="Description" width="2*"/>
                <FlexGridDetail maxHeight={250} template={ctx => <FlexGrid autoGenerateColumns={false} isReadOnly itemsSource={this.getProducts(ctx.item.CategoryID)}>
                        <FlexGridColumn header="ID" binding="ProductID"/>
                        <FlexGridColumn header="Name" binding="ProductName"/>
                        <FlexGridColumn header="Qty/Unit" binding="QuantityPerUnit"/>
                        <FlexGridColumn header="Unit Price" binding="UnitPrice"/>
                        <FlexGridColumn header="Discontinued" binding="Discontinued"/>
                    </FlexGrid>}/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
