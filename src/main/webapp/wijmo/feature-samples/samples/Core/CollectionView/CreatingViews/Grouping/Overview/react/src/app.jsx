import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.react.grid";
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.dumpData = () => {
            if (!this.state.view.groups) {
                console.log('*** no groups');
            }
            else {
                console.log('*** ' + this.state.view.groups.length + ' groups:');
                this.state.view.groups.forEach((group) => this.dumpGroup(group, ''));
            }
        };
        this.dumpGroup = (group, level) => {
            // show information for this group
            let propName = group.groupDescription['propertyName'], groupName = group.name, groupInfo = propName + ' > ' + groupName; // group summary
            //
            groupInfo += ' (' + group.items.length + ' items)'; // item count
            groupInfo += ' total sales: ' + wijmo.Globalize.format(group.getAggregate(wijmo.Aggregate.Sum, 'sales'), 'c2');
            console.log(level + groupInfo);
            //
            // show subgroups
            if (group.groups) {
                group.groups.forEach(child => this.dumpGroup(child, level + '  '));
            }
        };
        this.state = {
            view: new wijmo.CollectionView(getData(), {
                currentItem: null,
                sortDescriptions: [new wijmo.SortDescription('sales', false)]
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                <input type="radio" name="filter" value="" defaultChecked={true}/>
                No Grouping
            </label>
            <label>
                <input type="radio" name="filter" value="country"/>
                By Country
            </label>
            <label>
                <input type="radio" name="filter" value="country,product"/>
                By Country and by Product
            </label>
            <label>
                <input type="radio" name="filter" value="country,product,sales"/>
                By Country, Product, and Sales
            </label>

            <p>
                <button className="btn btn-default" onClick={this.dumpData}>
                    Show Result on Console
                </button>
            </p>
            <wjGrid.FlexGrid itemsSource={this.state.view} alternatingRowStep={0} headersVisibility="Column"></wjGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        // change the grouping
        document.addEventListener('change', (e) => {
            // remove the old groups
            this.state.view.groupDescriptions.clear();
            //
            // add the new groups
            let filter = e.target;
            if (filter.value) {
                filter.value.split(',').forEach((prop) => {
                    // group sales by value ranges
                    let pgd;
                    if (prop == 'sales') {
                        pgd = new wijmo.PropertyGroupDescription(prop, (item) => {
                            if (item.sales > 8000)
                                return 'High';
                            if (item.sales > 4000)
                                return 'Medium';
                            return 'Low';
                        });
                    }
                    else { // group others by value
                        pgd = new wijmo.PropertyGroupDescription(prop);
                    }
                    this.state.view.groupDescriptions.push(pgd);
                });
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
