import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataType } from '@grapecity/wijmo';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData(),
            countries: this.countries
        };
    }
    render() {
        return <div className="container-fluid">
			<FlexGrid itemsSource={this.state.data} gotFocus={s => this.startEditing(s)} selectionChanged={s => this.startEditing(s)}>
                <FlexGridColumn header="ID" binding="id" width={50} isReadOnly={true}/>
                <FlexGridColumn header="Country" binding="country" dataMap={this.state.countries}/>
                <FlexGridColumn header="Sales" binding="sales"/>
                <FlexGridColumn header="Expenses" binding="expenses"/>
                <FlexGridColumn header="Overdue" binding="overdue"/>
            </FlexGrid>
        </div>;
    }
    startEditing(flex) {
        let index = flex.selection.col, col = index > -1 ? flex.columns[index] : null;
        if (col && !col.isReadOnly && col.dataType != DataType.Boolean) {
            setTimeout(() => {
                flex.startEditing(false); // quick mode
            }, 50); // let the grid update first
        }
    }
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
