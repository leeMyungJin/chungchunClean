import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeUpcA } from '@grapecity/wijmo.react.barcode.common';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '01234567890'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>UPC-A barcode</div>
            <BarcodeUpcA value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
