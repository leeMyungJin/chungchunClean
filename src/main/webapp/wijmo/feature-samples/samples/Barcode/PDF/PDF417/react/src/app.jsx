import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodePdf417 } from '@grapecity/wijmo.react.barcode.composite';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'This is a PDF417 barcode'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>PDF417 barcode</div>
            <BarcodePdf417 value={this.state.theValue} autoWidthZoom={2}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
