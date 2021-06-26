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
                    { binding: 'date', header: 'Period', format: '"Q"q' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Total', format: 'c0', aggregate: 'Sum' },
                    { binding: 'amount', header: 'Average', format: 'c0', aggregate: 'Avg' },
                ],
                itemsSource: getData(1000),
                showRowTotals: 'Subtotals',
                valueFields: ['Total', 'Average'],
                rowFields: ['Year', 'Period'] // by Year and Quarter
            }),
            formats: [
                { name: 'Quarter ("Q"q)', value: '"Q"q' },
                { name: 'Fiscal Quarter ("FQ"u)', value: '"FQ"u' },
                { name: 'Long Month (MMMM)', value: 'MMMM' },
                { name: 'Short Month (MMM)', value: 'MMM' },
                { name: 'Month Number (M )', value: 'M ' },
            ]
        };
        this.fld = this.state.ng.fields.getField('Period');
    }
    render() {
        return (<div className="container-fluid">
                <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                <p>
                    Customize the "Period" field by changing its format:
                </p>
                <wjInput.ComboBox itemsSource={this.state.formats} displayMemberPath="name" selectedValuePath="value" textChanged={this.onTextChanged.bind(this)}></wjInput.ComboBox>
            </div>);
    }
    onTextChanged(combox) {
        this.fld.format = combox.selectedValue;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
