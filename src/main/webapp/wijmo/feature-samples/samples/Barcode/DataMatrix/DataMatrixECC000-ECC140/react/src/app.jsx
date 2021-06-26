import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { DataMatrixVersion } from '@grapecity/wijmo.barcode.specialized'; //
import { BarcodeDataMatrixEcc000 } from '@grapecity/wijmo.react.barcode.specialized';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+',
            theVersion: DataMatrixVersion.Ecc100,
        };
    }
    render() {
        return <div className="container-fluid">
            <div>DataMatrix barcode</div>
            <BarcodeDataMatrixEcc000 value={this.state.theValue} version={this.state.theVersion}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
