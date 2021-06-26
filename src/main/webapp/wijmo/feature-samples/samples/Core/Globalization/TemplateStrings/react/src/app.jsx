import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from "@grapecity/wijmo";
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.format1 = () => {
            let msg = wijmo.format('Welcome {name}! You have {miles:n0} miles in your account.', {
                name: 'Joe',
                miles: 2332123
            });
            alert(msg);
        };
        this.format2 = () => {
            let msg = wijmo.format('{name}, thanks for being a customer since {date:D}.', {
                name: 'Joe',
                date: new Date()
            });
            alert(msg);
        };
    }
    render() {
        return <div className="container-fluid">
            <button className="btn btn-default" onClick={this.format1}>Show First Result</button>
            <button className="btn btn-default" onClick={this.format2}>Show Second Result</button>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
