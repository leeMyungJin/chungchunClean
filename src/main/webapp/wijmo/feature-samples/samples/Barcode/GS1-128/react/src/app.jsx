import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeGs1_128 } from '@grapecity/wijmo.react.barcode.common';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'GS1128Demo'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>GS1-128 barcode</div>
            <BarcodeGs1_128 value={this.state.theValue} autoWidthZoom={2}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
