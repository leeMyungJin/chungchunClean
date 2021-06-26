import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CollectionView } from "@grapecity/wijmo";
import { CollectionViewNavigator } from "@grapecity/wijmo.react.input";
import { FlexGrid } from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this._getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <CollectionViewNavigator headerFormat="Page {currentPage:n0} of {pageCount:n0}" byPage={true} cv={this.state.data}/>
            <FlexGrid headersVisibility="Column" alternatingRowStep={0} itemsSource={this.state.data}/>
        </div>;
    }
    _getData() {
        // create an array with 1000 data items
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        let products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
        let data = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        // create a paged CollectionView with 6 data items per page
        return new CollectionView(data, {
            pageSize: 6,
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
