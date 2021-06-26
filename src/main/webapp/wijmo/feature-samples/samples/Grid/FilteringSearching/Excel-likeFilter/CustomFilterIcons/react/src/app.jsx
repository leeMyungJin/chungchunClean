import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from "./data";
import * as wjFilter from "@grapecity/wijmo.react.grid.filter";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <h3>Custom Icons</h3>
            <wjGrid.FlexGrid className="custom-icons" itemsSource={this.state.data}>
                <wjFilter.FlexGridFilter>
				</wjFilter.FlexGridFilter>
            </wjGrid.FlexGrid>

            <h3>Custom Colors</h3>
            <wjGrid.FlexGrid className="custom-colors" itemsSource={this.state.data}>
                <wjFilter.FlexGridFilter>
				</wjFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
