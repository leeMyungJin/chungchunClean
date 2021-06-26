import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialized = (filterMultirow) => {
            this.setState({ filterMultirow: filterMultirow }, () => {
                new wjGridFilter.FlexGridFilter(this.state.filterMultirow);
            });
        };
        this.state = {
            orders: getData().orders,
            threeLines: getData().ldThreeLines,
            filterMultirow: {}
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.threeLines} initialized={this.initialized}></wjGrid.MultiRow>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
