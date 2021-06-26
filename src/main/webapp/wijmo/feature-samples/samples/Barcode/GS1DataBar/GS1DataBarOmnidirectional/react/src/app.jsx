import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeGs1DataBarOmnidirectional } from '@grapecity/wijmo.react.barcode.composite';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '(01)20012345678909'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>GS1 DataBar Omnidirectional barcode</div>
            <BarcodeGs1DataBarOmnidirectional value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
