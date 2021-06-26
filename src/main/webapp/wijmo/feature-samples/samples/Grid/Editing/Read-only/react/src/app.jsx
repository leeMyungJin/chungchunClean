import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" isRequired={true}/>
                <FlexGridColumn binding="sales" header="Sales" isRequired={false}/>
                <FlexGridColumn binding="expenses" header="Expenses" isRequired={false}/>
                <FlexGridColumn binding="overdue" header="Overdue"/>
            </FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.beginningEdit.addHandler((s, e) => {
            let item = e.getRow().dataItem, binding = e.getColumn().binding;
            if (item.overdue && binding != 'overdue') { // prevent editing overdue items
                e.cancel = true;
            }
        });
    }
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
