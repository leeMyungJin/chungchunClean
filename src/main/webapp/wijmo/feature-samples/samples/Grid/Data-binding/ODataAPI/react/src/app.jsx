import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { ODataCollectionView } from '@grapecity/wijmo.odata';
import * as wjFilter from '@grapecity/wijmo.react.grid.filter';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: new ODataCollectionView("https://services.odata.org/Northwind/Northwind.svc", "Customers", {
                sortOnServer: true,
                filterOnServer: true
            }),
            itemCount: ""
        };
    }
    render() {
        return (<div className="container-fluid">
        <p>{this.state.itemCount}</p>
        <wjGrid.FlexGrid itemsSource={this.state.customers} isReadOnly={true} initialized={this.flexInitialized.bind(this)}>
          <wjFilter.FlexGridFilter />
        </wjGrid.FlexGrid>
      </div>);
    }
    flexInitialized(flexgrid) {
        flexgrid.loadedRows.addHandler(() => {
            this.setState({
                itemCount: flexgrid.rows.length + " items"
            });
        });
    }
}
ReactDOM.render(<App />, document.getElementById("app"));
