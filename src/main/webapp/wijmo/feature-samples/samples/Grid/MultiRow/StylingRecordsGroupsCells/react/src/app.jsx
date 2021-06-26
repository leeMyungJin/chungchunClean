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
        this.state = {
            orders: getData().orders,
            layoutDefinition: getData().ldThreeLines
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow className="multirow-css" itemsSource={this.state.orders} layoutDefinition={this.state.layoutDefinition}></wjGrid.MultiRow>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
