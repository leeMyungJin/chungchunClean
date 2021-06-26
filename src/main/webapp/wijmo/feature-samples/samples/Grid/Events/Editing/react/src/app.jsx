import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcCore from '@grapecity/wijmo';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import * as DataService from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: DataService.getData(),
            countries: DataService.getCountries(),
            logText: "please select a range on the grid"
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="log">
                {this.state.logText}
            </div>
            <FlexGrid autoClipboard={false} itemsSource={this.state.data} initialized={this.flexInitialized.bind(this)}>
                <FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" dataMap={this.state.countries} isRequired={true}/>
                <FlexGridColumn binding="sales" header="Sales" format="n2"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="n2"/>
                <FlexGridColumn binding="overdue" header="Overdue"/>
            </FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        this.setState({
            logText: ""
        });
        flexgrid.beginningEdit.addHandler((s, e) => {
            let col = s.columns[e.col];
            if (col.binding != "overdue") {
                let item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;
                    this.setState({ logText: 'Overdue items cannot be edited' });
                }
            }
        });
        flexgrid.cellEditEnding.addHandler((s, e) => {
            this.setState({ logText: '' });
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = wjcCore.changeType(s.activeEditor.value, wjcCore.DataType.Number, col.format);
                if (!wjcCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                    e.cancel = true;
                    this.setState({
                        logText: 'Please enter a positive amount'
                    });
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
