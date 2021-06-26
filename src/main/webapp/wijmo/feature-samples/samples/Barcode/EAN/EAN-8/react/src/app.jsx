import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeEan8 } from '@grapecity/wijmo.react.barcode.common';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '9031101'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>EAN-8 barcode</div>
            <BarcodeEan8 value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
