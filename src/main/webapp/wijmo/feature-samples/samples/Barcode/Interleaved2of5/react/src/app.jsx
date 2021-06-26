import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeInterleaved2of5 } from '@grapecity/wijmo.react.barcode.specialized';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '1234567895'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>Interleaved2of5 barcode</div>
            <BarcodeInterleaved2of5 value={this.state.theValue} autoWidthZoom={2}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
