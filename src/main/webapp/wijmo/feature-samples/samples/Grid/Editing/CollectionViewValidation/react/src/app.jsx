import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { CollectionView, DateTime } from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = this.getCountries();
        this.state = {
            data: new CollectionView(this.getData(), {
                getError: (item, prop, parsing) => {
                    // parsing errors
                    if (parsing) {
                        switch (prop) {
                            case 'country':
                                return 'Please select a country from the list.';
                            case 'date':
                                return 'Please enter a date in the format "M/d/yyyy".';
                            default:
                                return 'Please enter a number.';
                        }
                    }
                    // data errors
                    if (prop == 'sales' && item.sales < 0) {
                        return 'Sales cannot be negative!';
                    }
                    if (prop == 'expenses' && item.expenses < 0) {
                        return 'Expenses cannot be negative!';
                    }
                    // no errors
                    return null;
                }
            })
        };
    }
    render() {
        return <div className="container-fluid">
			<FlexGrid itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" isRequired={true} dataMap={this.countries}/>
                <FlexGridColumn binding="sales" header="Sales"/>
                <FlexGridColumn binding="expenses" header="Expenses"/>
                <FlexGridColumn binding="date" header="Date" isRequired={true} format="M/d/yyyy"/>
                <FlexGridColumn binding="overdue" header="Overdue"/>
            </FlexGrid>
        </div>;
    }
    getCountries() {
        return 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    }
    getData() {
        let countries = this.getCountries(), today = new Date(), data = [];
        for (var i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                date: DateTime.addDays(today, -Math.random() * 360),
                overdue: (i + 1) % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
