import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import * as wjCore from '@grapecity/wijmo';
import * as wjData from '@grapecity/wijmo.odata';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lazyLoadODataItems: [],
            nwindService: 'https://services.odata.org/Northwind/Northwind.svc',
        };
        this.created();
    }
    render() {
        return (<div className="container-fluid">
                <wjNav.TreeView itemsSource={this.state.lazyLoadODataItems} displayMemberPath={['FullName', 'ShipName', 'Summary']} childItemsPath={['Orders', 'Order_Details']} lazyLoadFunction={this.lazyLoadODataFunction.bind(this)}>
                </wjNav.TreeView>
            </div>);
    }
    created() {
        var employees = new wjData.ODataCollectionView(this.state.nwindService, "Employees", {
            fields: "EmployeeID,FirstName,LastName".split(","),
            loaded: () => {
                var items = employees.items.map(e => {
                    e.FullName = e.FirstName + " " + e.LastName;
                    e.Orders = []; // lazy-load orders
                    return e;
                });
                this.setState({
                    lazyLoadODataItems: items
                });
            }
        });
    }
    lazyLoadODataFunction(node, callback) {
        switch (node.level) {
            // load orders for an employee
            case 0:
                var url = "Employees(" + node.dataItem.EmployeeID + ")/Orders";
                var orders = new wjData.ODataCollectionView(this.state.nwindService, url, {
                    fields: "OrderID,ShipName,ShipCountry".split(","),
                    loaded: () => {
                        var items = orders.items.map(function (e) {
                            e.Order_Details = []; // lazy-order details
                            return e;
                        });
                        callback(items);
                    }
                });
                break;
            // load extended details for an order
            case 1:
                var url = "Order_Details_Extendeds/?$filter=OrderID eq " +
                    node.dataItem.OrderID;
                var details = new wjData.ODataCollectionView(this.state.nwindService, url, {
                    fields: "ProductName,ExtendedPrice".split(","),
                    loaded: () => {
                        var items = details.items.map(e => {
                            e.Summary = wjCore.format("{ProductName}: {ExtendedPrice:c}", e);
                            return e;
                        });
                        callback(items);
                    }
                });
                break;
            // default
            default:
                callback(null);
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
