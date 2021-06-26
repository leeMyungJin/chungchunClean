import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeJapanesePostal } from '@grapecity/wijmo.react.barcode.specialized';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '6540123789-A-K-Z'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>Japanese Postal barcode</div>
            <BarcodeJapanesePostal value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
