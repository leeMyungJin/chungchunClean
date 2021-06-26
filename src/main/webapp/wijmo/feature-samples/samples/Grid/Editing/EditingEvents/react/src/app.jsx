import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { DataType, changeType, isNumber } from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData(),
            editMsg: '&nbsp;'
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="edit-msg" dangerouslySetInnerHTML={{ __html: this.state.editMsg }}/>
            <FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" isRequired={true} dataMap={this.countries}/>
                <FlexGridColumn binding="sales" header="Sales" format="n2"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="n2"/>
                <FlexGridColumn binding="overdue" header="Overdue"/>
            </FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.beginningEdit.addHandler((s, e) => {
            let msg = '&nbsp;';
            let col = s.columns[e.col];
            if (col.binding != 'overdue') {
                let item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;
                    msg = 'Overdue items cannot be edited';
                }
            }
            this.setState({
                editMsg: msg
            });
        });
        flex.cellEditEnding.addHandler((s, e) => {
            let msg = '&nbsp;';
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = changeType(s.activeEditor.value, DataType.Number, col.format);
                if (!isNumber(value) || value < 0) { // prevent negative sales/expenses
                    e.cancel = true;
                    msg = 'Please enter a positive amount';
                }
            }
            this.setState({
                editMsg: msg
            });
        });
    }
    getData() {
        // create some random data
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
