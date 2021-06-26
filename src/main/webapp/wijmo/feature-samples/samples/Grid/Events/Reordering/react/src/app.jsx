import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
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
            <p>
                For example, the grid below does not allow dragging
                the 'country' column to the last or first positions:
            </p>
            
            <wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        // prevent 'country' column from being dragged to index 0
        flexgrid.draggingColumn.addHandler((s, e) => {
            this._theColumn = s.columns[e.col].binding;
        });
        flexgrid.draggingColumnOver.addHandler((s, e) => {
            if (this._theColumn == "country") {
                if (e.col == 0 || e.col == s.columns.length - 1) {
                    e.cancel = true;
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
