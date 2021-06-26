import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            deferResizing: true
        };
    }
    render() {
        return <div className="container-fluid">
            <label htmlFor="deferResizing">Defer Resizing 
                <input id="deferResizing" type="checkbox" checked={this.state.deferResizing} onChange={this.ckChanged.bind(this)}/>
            </label>
            <wjcGrid.FlexGrid itemsSource={this.state.data} deferResizing={this.state.deferResizing}></wjcGrid.FlexGrid>
        </div>;
    }
    ckChanged(e) {
        this.setState({
            deferResizing: (e.target).checked
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
