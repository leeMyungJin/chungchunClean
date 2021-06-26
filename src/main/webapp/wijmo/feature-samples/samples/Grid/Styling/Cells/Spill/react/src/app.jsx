import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { toggleClass } from "@grapecity/wijmo";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid alternatingRowStep={0} anchorCursor={true} showMarquee={true} showSelectedHeaders="All" itemsSource={this.state.data} formatItem={(s, e) => {
            if (e.panel == s.cells) {
                let spill = e.col < s.columns.length - 1 &&
                    e.cell.innerHTML && !s.getCellData(e.row, e.col + 1);
                toggleClass(e.cell, 'spill', spill);
            }
        }}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
