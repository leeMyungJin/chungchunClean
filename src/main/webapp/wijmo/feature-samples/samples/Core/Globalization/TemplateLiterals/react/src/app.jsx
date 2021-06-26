import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { glbz } from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.format1 = () => {
            this.setState({ result1: glbz `Today is ${new Date()}:d, and PI is ${Math.PI}:n4.` });
        };
        this.format2 = () => {
            this.setState({ result2: glbz `Today is‌ ${new Date()}:'dddd, MMMM dd'.` });
        };
        this.state = {
            result1: '',
            result2: ''
        };
    }
    render() {
        return <div className="container-fluid">
            <p>Click the button below to evaluate this template literal using Wijmo's
                <b>glbz</b> tag function that formats numbers and dates using Wijmo's
                <b>Globalize</b> class:
            </p>
            <pre>glbz`Today is $‌{'{'}new Date()}:d, and PI is $‌{'{'}Math.PI}:n4.`</pre>
            <button id="btn1" className="btn btn-default" onClick={this.format1}>
                Show Result
            </button>
            <pre id="result1">{this.state.result1}</pre>

            <p>
                This example shows how you can use quoted format strings for dates and times:
            </p>
            <pre>glbz`Today is‌ ${'{'}new Date()}:'dddd, MMMM dd'.\`</pre>
            <button id="btn2" className="btn btn-default" onClick={this.format2}>
                Show Result
            </button>
            <pre id="result2">{this.state.result2}</pre>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
