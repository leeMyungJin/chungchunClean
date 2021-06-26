import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            data: getData()
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.filter != prevState.filter) {
            this.applyHierarchicalFilter();
        }
    }
    render() {
        return <div className="container-fluid">
            <div className="input-group">
                <div className="input-group-addon">
                    <span className="glyphicon glyphicon-search"></span>
                </div>
                <input className="form-control" placeholder="Filter" value={this.state.filter} onInput={s => this.setState({
            filter: event.target.value
        })}/>
            </div>
            
            <FlexGrid childItemsPath="cities" headersVisibility="Column" itemsSource={this.state.data} initialized={s => this.flex = s} sortedColumn={s => this.applyHierarchicalFilter()}/>
            <p>
              For more details in hierarchical filtering, please see our{' '}
              <a href="https://www.grapecity.com/blogs/filter-hierarchical-data-flexgrid/" target="_blank">
                How to Filter Hierarchical Data in FlexGrid and Angular
              </a>
              {' '}blog.
            </p>
        </div>;
    }
    applyHierarchicalFilter() {
        let filter = this.state.filter.toLowerCase(), grid = this.flex, rows = grid.rows;
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i], // wijmo.grid.GroupRow
            state = row.dataItem, rng = row.getCellRange();
            // handle states (level 0)
            if (row.level == 0) {
                // check if the state name matches the filter
                let stateVisible = state.name.toLowerCase().indexOf(filter) >= 0;
                if (stateVisible) {
                    // it does, so show the state and all its cities
                    for (let j = rng.topRow; j <= rng.bottomRow; j++) {
                        rows[j].visible = true;
                    }
                }
                else {
                    // it does not, so check the cities
                    for (let j = rng.topRow + 1; j <= rng.bottomRow; j++) {
                        let city = rows[j].dataItem, cityVisible = city.name.toLowerCase().indexOf(filter) >=
                            0;
                        rows[j].visible = cityVisible;
                        stateVisible = stateVisible || cityVisible;
                    }
                    // if at least one city is visible, the state is visible
                    rows[i].visible = stateVisible;
                }
                // move on to the next group
                i = rng.bottomRow;
            }
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
