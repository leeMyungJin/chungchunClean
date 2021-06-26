import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { Firestore, Collection } from '@grapecity/wijmo.cloud';
import { ComboBox, CollectionViewNavigator } from '@grapecity/wijmo.react.input';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        // create the Firestore data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const PROJECT_ID = 'test-9c0be';
        const fireStore = new Firestore(PROJECT_ID, API_KEY);
        // load the Customers collection (selected fields, server-side paging)
        const countries = 'Brazil,France,Germany,UK,USA'.split(',');
        const customers = new Collection(fireStore, 'Customers', {
            sortDescriptions: ['CustomerID'],
            fields: [
                'CustomerID',
                'CompanyName',
                'ContactName',
                'City',
                'Country'
            ],
            pageSize: 6,
            pageOnServer: true
        }).where('Country', '==', countries[0]);
        // expose customers, countries
        this.state = {
            customers: customers,
            countries: countries
        };
    }
    // update filter when selected country changes
    countryChanged(countryCombo) {
        let customers = this.state.customers;
        customers.where('Country', '==', countryCombo.text);
        customers.moveToFirstPage();
    }
    render() {
        return <div className='container-fluid'>
            <ComboBox itemsSource={this.state.countries} textChanged={s => this.countryChanged(s)}/>
            <CollectionViewNavigator cv={this.state.customers} byPage={true} headerFormat="Page {current:n0}"/>
            <FlexGrid selectionMode="MultiRange" showMarquee={true} isReadOnly={true} itemsSource={this.state.customers}>
                <FlexGridColumn binding="CustomerID" header="Customer ID"/>
                <FlexGridColumn binding="CompanyName" header="Company Name" width={200}/>
                <FlexGridColumn binding="ContactName" header="Contact Name" width={150}/>
                <FlexGridColumn binding="City"/>
                <FlexGridColumn binding="Country"/>
            </FlexGrid>
        </div>;
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
