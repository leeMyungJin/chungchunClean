import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjFilter from "@grapecity/wijmo.react.grid.filter";
import * as wjcOData from '@grapecity/wijmo.odata';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new wjcOData.ODataCollectionView("https://services.odata.org/Northwind/Northwind.svc", "Customers", {
                filterOnServer: true,
                sortOnServer: true
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid itemsSource={this.state.data} isReadOnly={true}>
                <wjFilter.FlexGridFilter defaultFilterType="Condition">
                </wjFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
