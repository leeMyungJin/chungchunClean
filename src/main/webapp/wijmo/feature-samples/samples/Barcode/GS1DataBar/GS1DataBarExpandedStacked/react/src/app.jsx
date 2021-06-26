import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeGs1DataBarExpandedStacked } from '@grapecity/wijmo.react.barcode.composite';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: '(01)00012345678905(10)ABC123'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>GS1 DataBar Expanded Stacked barcode</div>
            <BarcodeGs1DataBarExpandedStacked value={this.state.theValue} autoWidthZoom={2}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
