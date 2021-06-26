import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                fields: [
                    { binding: 'date', header: 'Year', format: 'yyyy' },
                    { binding: 'date', header: 'Period', format: 'MMM' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' },
                    { binding: 'amount', header: 'Show As', format: 'c0', aggregate: 'Sum' },
                ],
                itemsSource: getData(1000),
                showRowTotals: 'Subtotals',
                valueFields: ['Amount', 'Show As'],
                rowFields: ['Year', 'Period'] // by Year and Quarter
            }),
            showAsOptions: 'NoCalculation,DiffRow,DiffRowPct,DiffCol,DiffColPct,PctGrand,PctRow,PctCol,RunTot,RunTotPct'.split(',')
        };
        this.fld = this.state.ng.fields.getField('Show As');
    }
    render() {
        return (<div className="container-fluid">
                <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                <p>
                    Change the value of the field's <b>showAs</b> property:
                </p>
                <wjInput.ComboBox itemsSource={this.state.showAsOptions} textChanged={this.onTextChanged.bind(this)}></wjInput.ComboBox>
                <p>
                    <label>
                        Show Period in columns
                    <input id="periodInColumns" type="checkbox" onClick={this.onPeriodInColumns.bind(this)}/>
                    </label>
                </p>
            </div>);
    }
    onTextChanged(combox) {
        this.fld.showAs = wjcOlap.ShowAs[combox.text];
        this.fld.format = combox.text.indexOf('Pct') > -1 ? 'p0' : 'c0';
    }
    onPeriodInColumns(e) {
        let list = e.target.checked ? this.state.ng.columnFields : this.state.ng.rowFields;
        list.push('Period');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
