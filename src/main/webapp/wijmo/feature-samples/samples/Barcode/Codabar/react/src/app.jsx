import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeCodabar } from '@grapecity/wijmo.react.barcode.common';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'A15126893B'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>Codabar barcode</div>
            <BarcodeCodabar value={this.state.theValue} autoWidthZoom={2}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
