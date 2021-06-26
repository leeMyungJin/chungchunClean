import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { FlexGridDetail } from '@grapecity/wijmo.react.grid.detail';
import * as wjInput from '@grapecity/wijmo.react.input';
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
            detailVisibilityMode: 'ExpandSingle',
            maxHeight: 0,
            isAnimated: true,
            keyActionEnter: 'None',
            evenRowHasDetail: false,
        };
        this.clickHandlerFactory = this.clickHandlerFactory.bind(this);
    }
    //
    render() {
        return (<div className="container-fluid">
                <h3>HTML in Row Details</h3>
                <p>
                    This grid shows product categories on each row. Expanding
                    the rows shows an HTML element with information about
                    the products in that category:
                </p>
                <FlexGrid itemsSource={this.state.categories} isReadOnly>
                    <FlexGridColumn header="Category Name" binding="CategoryName" width="*"/>
                    <FlexGridColumn header="Description" binding="Description" width="2*"/>
                    <FlexGridDetail isAnimated template={ctx => (<React.Fragment>
                            ID: <b>{ctx.item.CategoryID}</b><br />
                            Name: <b>{ctx.item.CategoryName}</b><br />
                            Description: <b>{ctx.item.Description}</b><br />
                            <ol>
                                {this.getProducts(ctx.item.CategoryID)
            .map(p => <li key={p.ProductID}>{p.ProductName}</li>)}
                            </ol>
                        </React.Fragment>)}/>
                </FlexGrid>

                <h3>Grids in Row Details</h3>
                <p>
                    You can add anything you want to the detail rows,
                    including other grids. This example shows the same
                    categories, but the detail row uses another grid
                    to show the products:
                </p>
                <FlexGrid itemsSource={this.state.categories} isReadOnly autoGenerateColumns={false}>
                    <FlexGridColumn header="Category Name" binding="CategoryName" width="*"/>
                    <FlexGridColumn header="Description" binding="Description" width="2*"/>
                    <FlexGridDetail detailVisibilityMode={this.state.detailVisibilityMode} maxHeight={this.state.maxHeight} isAnimated={this.state.isAnimated} keyActionEnter={this.state.keyActionEnter} rowHasDetail={this.state.evenRowHasDetail ? this.rowHasDetailFn : null} template={ctx => (<FlexGrid itemsSource={this.getProducts(ctx.item.CategoryID)} isReadOnly>
                                <FlexGridColumn header="ID" binding="ProductID"/>
                                <FlexGridColumn header="Name" binding="ProductName"/>
                                <FlexGridColumn header="Qty/Unit" binding="QuantityPerUnit"/>
                                <FlexGridColumn header="Unit Price" binding="UnitPrice"/>
                                <FlexGridColumn header="Discontinued" binding="Discontinued"/>
                            </FlexGrid>)}/>
                </FlexGrid>
                <div className="grid-options">
                    <wjInput.Menu header="detailVisibilityMode" value={this.state.detailVisibilityMode} itemClicked={this.clickHandlerFactory('detailVisibilityMode')}>
                        <wjInput.MenuItem value="Code">Code</wjInput.MenuItem>
                        <wjInput.MenuItem value="Selection">Selection</wjInput.MenuItem>
                        <wjInput.MenuItem value="ExpandSingle">ExpandSingle</wjInput.MenuItem>
                        <wjInput.MenuItem value="ExpandMulti">ExpandMulti</wjInput.MenuItem>
                    </wjInput.Menu>
                    <wjInput.Menu header="maxHeight" value={this.state.maxHeight} itemClicked={this.clickHandlerFactory('maxHeight')}>
                        <wjInput.MenuItem value={0}>null</wjInput.MenuItem>
                        <wjInput.MenuItem value={100}>100</wjInput.MenuItem>
                        <wjInput.MenuItem value={200}>200</wjInput.MenuItem>
                        <wjInput.MenuItem value={300}>300</wjInput.MenuItem>
                        <wjInput.MenuItem value={400}>400</wjInput.MenuItem>
                        <wjInput.MenuItem value={500}>500</wjInput.MenuItem>
                    </wjInput.Menu>
                    <wjInput.Menu header="isAnimated" value={this.state.isAnimated} itemClicked={this.clickHandlerFactory('isAnimated')}>
                        <wjInput.MenuItem value={true}>True</wjInput.MenuItem>
                        <wjInput.MenuItem value={false}>False</wjInput.MenuItem>
                    </wjInput.Menu>
                    <wjInput.Menu header="keyActionEnter" value={this.state.keyActionEnter} itemClicked={this.clickHandlerFactory('keyActionEnter')}>
                        <wjInput.MenuItem value="None">None</wjInput.MenuItem>
                        <wjInput.MenuItem value="ToggleDetail">ToggleDetail</wjInput.MenuItem>
                    </wjInput.Menu>
                    <wjInput.Menu header="rowDetails" value={this.state.evenRowHasDetail} itemClicked={this.clickHandlerFactory('evenRowHasDetail')}>
                        <wjInput.MenuItem value={false}>All</wjInput.MenuItem>
                        <wjInput.MenuItem value={true}>Even rows only</wjInput.MenuItem>
                    </wjInput.Menu>
                </div>
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
    clickHandlerFactory(prop) {
        return (s, e) => {
            if (s.selectedIndex > -1) {
                this.setState({ [prop]: s.selectedValue });
            }
        };
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
