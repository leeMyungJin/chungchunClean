import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tax: 0.085 };
    }
    render() {
        return <div className="container-fluid">
            <wjInput.Menu header='Tax' value={this.state.tax} itemClicked={this.selectedTaxChanged.bind(this)}>
                <wjInput.MenuItem value={0}>Exempt</wjInput.MenuItem>
                <wjInput.MenuItem value={0.01}>1%</wjInput.MenuItem>
                <wjInput.MenuItem value={0.05}>5%</wjInput.MenuItem>
                <wjInput.MenuItem value={0.085}>8.5%</wjInput.MenuItem>
                <wjInput.MenuItem value={0.10}>10%</wjInput.MenuItem>
                <wjInput.MenuItem value={0.20}>20%</wjInput.MenuItem>
            </wjInput.Menu>
        </div>;
    }
    selectedTaxChanged(sender) {
        if (sender.selectedValue) {
            this.setState({ tax: sender.selectedValue });
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
