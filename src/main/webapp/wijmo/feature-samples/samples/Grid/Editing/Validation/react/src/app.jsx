import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { changeType, DataType, isNumber } from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" isRequired={true} dataMap={this.countries}/>
                <FlexGridColumn binding="sales" header="Sales" format="n2"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="n2"/>
                <FlexGridColumn binding="overdue" header="Overdue"/>
            </FlexGrid>
        </div>;
    }
    // event-based validation
    initializeGrid(flex) {
        flex.cellEditEnding.addHandler((s, e) => {
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = changeType(s.activeEditor.value, DataType.Number, col.format);
                if (!isNumber(value) || value < 0) {
                    e.cancel = true;
                    e.stayInEditMode = true;
                    alert('Please enter a positive amount.');
                }
            }
        });
    }
    // create some random data
    getData() {
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
