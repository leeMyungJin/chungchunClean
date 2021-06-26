import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getProductsByCategory } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getProductsByCategory()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.data} headersVisibility="Column" childItemsPath="products" treeIndent={25}>
                <wjcGrid.FlexGridColumn binding="name" header="Name" width="3*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="id" header="ID" dataType="String" width="*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="price" header="Unit Price" format="n2" dataType="Number" width="*"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
