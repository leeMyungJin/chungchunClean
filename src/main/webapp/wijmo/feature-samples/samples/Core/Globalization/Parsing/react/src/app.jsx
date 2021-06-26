import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateResult: null,
            numberResult: null,
            selectedValue: 'en',
            dateFormat: 'd',
            date: '12/31/2016',
            numberFormat: 'n2',
            number: '123.456'
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                <wjInput.Menu header='Culture' value={this.state.selectedValue} itemClicked={this._selectedCultureChanged.bind(this)}>
                    <wjInput.MenuItem value="en">English (US)</wjInput.MenuItem>
                    <wjInput.MenuItem value="en-GB">English (UK)</wjInput.MenuItem>
                    <wjInput.MenuItem value="es">Spanish</wjInput.MenuItem>
                    <wjInput.MenuItem value="de">German</wjInput.MenuItem>
                    <wjInput.MenuItem value="it">Italian</wjInput.MenuItem>
                    <wjInput.MenuItem value="fr">French</wjInput.MenuItem>
                    <wjInput.MenuItem value="pt">Portuguese</wjInput.MenuItem>
                    <wjInput.MenuItem value="ru">Russian</wjInput.MenuItem>
                    <wjInput.MenuItem value="ja">Japanese</wjInput.MenuItem>
                    <wjInput.MenuItem value="ko">Korean</wjInput.MenuItem>
                    <wjInput.MenuItem value="zh">Chinese</wjInput.MenuItem>
                </wjInput.Menu>
            </p>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Dates</h4>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <label id="dateFormat">Input format:</label>
                        <input id="dateFormat" defaultValue={this.state.dateFormat} onChange={this._dateFormatChanged.bind(this)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateInput">Input string:</label>
                        <input id="dateInput" defaultValue={this.state.date} onChange={this._dateChanged.bind(this)}/>
                    </div>

                    <button className="btn btn-default" onClick={() => this._parseDate(this.state.date, this.state.dateFormat)}>
                        Parse Date
                    </button>

                    <span>{this.state.dateResult}</span>
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Numbers</h4>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="numberFormat">Input format:</label>
                        <input id="numberFormat" defaultValue={this.state.numberFormat} onChange={this._numberFormatChanged.bind(this)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="numberInput">Input string:</label>
                        <input id="numberInput" defaultValue={this.state.number} onChange={this._numberChanged.bind(this)}/>
                    </div>

                    <button className="btn btn-default" onClick={() => this._parseNumber(this.state.number, this.state.numberFormat)}>
                        Parse Number
                    </button>

                    <span>{this.state.numberResult}</span>
                </div>
            </div>
        </div>;
    }
    _parseDate(value, format) {
        let result = wijmo.Globalize.parseDate(value, format);
        //
        this.setState({
            dateResult: wijmo.isDate(result)
                ? 'Parsed OK: ' + wijmo.Globalize.format(result, format)
                : '** Could not parse date... **'
        });
    }
    _parseNumber(value, format) {
        let result = wijmo.Globalize.parseFloat(value, format);
        //
        this.setState({
            numberResult: wijmo.isNumber(result)
                ? 'Parsed OK: ' + wijmo.Globalize.format(result, format)
                : '** Could not parse number... **'
        });
    }
    _loadCulture(culture) {
        // apply new culture to page
        let url = `node_modules/@grapecity/wijmo.cultures/wijmo.culture.${culture}.js`, scripts = document.getElementsByTagName('script');
        //
        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            if (script.src.indexOf('/cultures/wijmo.culture.') > -1) {
                script.parentElement.removeChild(script);
                break;
            }
        }
        //
        let script = document.createElement('script');
        //
        script.src = url;
        document.head.appendChild(script);
    }
    _selectedCultureChanged(sender) {
        if (sender.selectedValue) {
            this.setState({ selectedValue: sender.selectedValue });
            this._loadCulture(sender.selectedValue);
        }
    }
    _numberChanged(e) {
        this.setState({ number: e.target.value });
    }
    _numberFormatChanged(e) {
        this.setState({ numberFormat: e.target.value });
    }
    _dateChanged(e) {
        this.setState({ date: e.target.value });
    }
    _dateFormatChanged(e) {
        this.setState({ dateFormat: e.target.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
