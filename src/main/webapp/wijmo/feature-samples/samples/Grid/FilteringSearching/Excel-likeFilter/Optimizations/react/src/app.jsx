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
            <wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjFilter.FlexGridFilter initialized={this.initialized.bind(this)}/>
            </wjGrid.FlexGrid>
        </div>;
    }
    initialized(filter) {
        this.filter = filter;
    }
    componentDidMount() {
        // ratings are values from 0 to 5
        let filterRating = this.filter.getColumnFilter("rating");
        filterRating.valueFilter.uniqueValues = [0, 1, 2, 3, 4, 5];
        // limit number of values shown in sales filter
        let filterSales = this.filter.getColumnFilter("sales");
        filterSales.valueFilter.maxValues = 20;
        // filter expenses only by condition
        let filterExpenses = this.filter.getColumnFilter("expenses");
        filterExpenses.filterType = wjcGridFilter.FilterType.Condition;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
