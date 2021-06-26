import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeItf14 } from '@grapecity/wijmo.react.barcode.specialized';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '98765432109213'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>ITF-14 barcode</div>
            <BarcodeItf14 value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
