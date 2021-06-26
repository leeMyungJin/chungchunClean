import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataMap } from '@grapecity/wijmo.grid';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            dataMap: this.getDataMap()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid showMarquee={true} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" isReadOnly={true}/>
                <FlexGridColumn binding="country" header="AutoComplete" dataMap={this.state.dataMap} dataMapEditor="AutoComplete"/>
                <FlexGridColumn binding="country" header="DropDownList" dataMap={this.state.dataMap} dataMapEditor="DropDownList"/>
                <FlexGridColumn binding="country" header="RadioButtons" dataMap={this.state.dataMap} dataMapEditor="RadioButtons" width={300} align="center"/>
                <FlexGridColumn binding="active" header="Active"/>
                <FlexGridColumn binding="downloads" header="Downloads"/>
                <FlexGridColumn binding="sales" header="Sales"/>
                <FlexGridColumn binding="expenses" header="Expenses"/>
            </FlexGrid>
        </div>;
    }
    getDataMap() {
        let countries = 'US,UK,Japan,Other'.split(','), arr = countries.map((name, id) => { return { id: id, name: name }; });
        return new DataMap(arr, 'id', 'name');
    }
    getData() {
        let data = [], map = this.getDataMap(), len = map.collectionView.items.length;
        for (let i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: Math.floor(Math.random() * len),
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
