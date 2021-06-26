import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { DataMap } from '@grapecity/wijmo.grid';
import { InputDate, InputTime, ComboBox, AutoComplete, InputColor, InputNumber } from '@grapecity/wijmo.input';
import { getData, getCountries, getProducts } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = getData();
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid showMarquee={true} alternatingRowStep={0} selectionMode="MultiRange" itemsSource={this.data}>
                <FlexGridColumn binding="id" header="ID" width={80} isReadOnly={true}/>
                <FlexGridColumn binding="date" header="Date" format="d" editor={new InputDate(document.createElement('div'))}/>
                <FlexGridColumn binding="time" header="Time" format="t" editor={new InputTime(document.createElement('div'), {
            format: 't',
            step: 30
        })}/>
                <FlexGridColumn binding="country" header="Country" editor={new ComboBox(document.createElement('div'), {
            itemsSource: getCountries()
        })}/>
                <FlexGridColumn binding="productId" header="Product" dataMap={new DataMap(getProducts(), 'id', 'name')} editor={new AutoComplete(document.createElement('div'), {
            itemsSource: getProducts(),
            selectedValuePath: 'id',
            displayMemberPath: 'name'
        })}/>
                <FlexGridColumn binding="color" header="Color" cellTemplate='<span class="colorbox" style="background:${text};"></span> ${text}' editor={new InputColor(document.createElement('div'))}/>
                <FlexGridColumn binding="amount" header="Amount" format="n2" editor={new InputNumber(document.createElement('div'), {
            format: 'n2',
            step: 10,
            min: 0,
            max: 10000
        })}/>
                <FlexGridColumn binding="premium" header="Premium" cssClass="switch"/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
