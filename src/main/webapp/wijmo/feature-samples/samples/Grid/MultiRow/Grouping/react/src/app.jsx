import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onShowGroupClick = (target) => {
            let groupMultirow = this.state.groupMultirow;
            groupMultirow.showGroups = target.checked;
            this.setState({ groupMultirow: groupMultirow });
        };
        this.onCollapseClick = () => {
            this.state.groupMultirow.collapseGroupsToLevel(0);
        };
        this.onExpandClick = () => {
            this.state.groupMultirow.collapseGroupsToLevel(10);
        };
        this.initialized = (groupMultirow) => {
            this.setState({ groupMultirow: groupMultirow });
        };
        this.state = {
            groupedOrders: getData().groupedOrders,
            threeLines: getData().ldThreeLines
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.groupedOrders} layoutDefinition={this.state.threeLines} groupHeaderFormat="{name}: <b>{value} </b>({count:n0} items)" initialized={this.initialized}></wjGrid.MultiRow>
            <button className="btn" onClick={this.onCollapseClick}>Collapse All</button>
            <button className="btn" onClick={this.onExpandClick}>Expand All</button>
            <label>
                <input type="checkbox" defaultChecked={true} onClick={e => this.onShowGroupClick(e.target)}/>
                Show Groups
            </label>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
