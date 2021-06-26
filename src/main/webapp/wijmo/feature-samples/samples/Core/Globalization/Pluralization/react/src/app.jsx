import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wijmo from "@grapecity/wijmo";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.valueChanged = (e) => {
            this.setState({ value: e.value });
        };
        this.formatValue = () => {
            return wijmo.format(this.state.data, {
                count: this.state.value
            });
        };
        this.state = {
            data: JSON.stringify({
                count: "count",
                when: {
                    0: "No items selected.",
                    1: "A single item is selected.",
                    2: "A pair is selected.",
                    3: "A trio is selected.",
                    4: "A quartet is selected.",
                    other: "{count:n0} items are selected."
                }
            }),
            value: 1
        };
    }
    render() {
        return <div className="container-fluid">
            <wjInput.InputNumber step={1} value={this.state.value} valueChanged={this.valueChanged}></wjInput.InputNumber>
            <p>{this.formatValue()}</p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
