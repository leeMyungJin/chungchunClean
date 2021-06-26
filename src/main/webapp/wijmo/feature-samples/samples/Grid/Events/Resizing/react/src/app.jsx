import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { Tooltip, format } from '@grapecity/wijmo';
import { getData, getCountries } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            countries: getCountries()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid allowAddNew={true} initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country" isRequired={true} dataMap={this.state.countries}/>
                <FlexGridColumn binding="sales" header="Sales" format="n2"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="n2"/>
                <FlexGridColumn binding="overdue" header="Overdue"/>
            </FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        let toolTip = new Tooltip();
        flexgrid.resizingColumn.addHandler((s, e) => {
            let cell = s.columnHeaders.getCellElement(0, e.col);
            let col = e.panel.columns[e.col];
            let tip = format('Column: <b>{col}</b>, Width: <b>{wid:n0}px</b>', {
                col: col.header || '[no header]',
                wid: col.width
            });
            toolTip.show(cell, tip);
        });
        flexgrid.resizedColumn.addHandler(() => {
            toolTip.hide();
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
