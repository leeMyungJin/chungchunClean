import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from "./data";
import * as wjFilter from "@grapecity/wijmo.react.grid.filter";
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid allowSorting={false} itemsSource={this.state.data}>
                <wjFilter.FlexGridFilter initialized={this.initialized.bind(this)}>
				</wjFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
    initialized(filter) {
        this.filter = filter;
        this.filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
        this.filter.showSortButtons = false;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
