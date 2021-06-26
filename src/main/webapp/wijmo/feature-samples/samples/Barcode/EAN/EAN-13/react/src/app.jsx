import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeEan13 } from '@grapecity/wijmo.react.barcode.common';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '963850741111',
            theAddOn: 86,
        };
    }
    render() {
        return <div className="container-fluid">
            <div>EAN-13 barcode</div>
            <BarcodeEan13 value={this.state.theValue} addOn={this.state.theAddOn}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
