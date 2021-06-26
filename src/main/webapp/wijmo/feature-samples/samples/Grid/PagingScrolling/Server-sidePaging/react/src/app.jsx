import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { ODataCollectionView } from '@grapecity/wijmo.odata';
import { CollectionViewNavigator } from '@grapecity/wijmo.react.input';
import { FlexGrid } from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    render() {
        return <div className="container-fluid">
            <CollectionViewNavigator byPage={true} headerFormat="Page {currentPage:n0} of {pageCount:n0}" cv={this.state.data}/>
            <FlexGrid isReadOnly={true} alternatingRowStep={0} headersVisibility="Column" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}/>
        </div>;
    }
    initializeGrid(flex) {
        var url = 'https://services.odata.org/Northwind/Northwind.svc';
        var view = new ODataCollectionView(url, 'Customers', {
            pageSize: 6,
            pageOnServer: true,
            sortOnServer: true
        });
        this.setState({
            data: view
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
