import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeCode49 } from '@grapecity/wijmo.react.barcode.specialized';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'Code49_123'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>Code49 barcode</div>
            <BarcodeCode49 value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
