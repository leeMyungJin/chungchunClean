import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { format, SortDescription } from "@grapecity/wijmo";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            selectedItem: ""
        };
    }
    render() {
        return <div className="container-fluid">
            <p dangerouslySetInnerHTML={{ __html: this.state.selectedItem }}/>
			<FlexGrid initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn header="Country" binding="country" width="2*"/>
                <FlexGridColumn header="Sales" binding="sales" width="*" format="n2"/>
                <FlexGridColumn header="Expenses" binding="expenses" width="*" format="n2"/>
            </FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        this.flex = flexgrid;
        // sort the data by country
        let sd = new SortDescription("country", true);
        flexgrid.collectionView.sortDescriptions.push(sd);
        flexgrid.collectionView.currentChanged.addHandler(this.updateCurrentInfo.bind(this));
        this.updateCurrentInfo();
    }
    updateCurrentInfo() {
        this.setState({
            selectedItem: format("Country: <b>{country}</b>, Sales: <b>{sales:c0}</b> Expenses: <b>{expenses:c0}</b>", this.flex.collectionView.currentItem)
        });
    }
    getData() {
        // create some random data
        let countries = "US,Germany,UK,Japan,Italy,Greece".split(","), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
