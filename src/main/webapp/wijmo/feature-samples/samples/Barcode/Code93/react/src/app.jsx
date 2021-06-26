import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeCode93 } from '@grapecity/wijmo.react.barcode.specialized';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'CODE93'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>Code93 barcode</div>
            <BarcodeCode93 value={this.state.theValue} autoWidthZoom={2}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
