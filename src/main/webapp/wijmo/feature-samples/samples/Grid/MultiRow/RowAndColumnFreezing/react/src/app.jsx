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
        this.initSlip = (freezeMultirow) => {
            this.setState({ freezeMultirow: freezeMultirow });
        };
        this.onFreezeClick = () => {
            let freezeMultirow = this.state.freezeMultirow;
            freezeMultirow.frozenColumns = this.state.freezeMultirow.frozenColumns ? 0 : 2;
            freezeMultirow.frozenRows = this.state.freezeMultirow.frozenRows ? 0 : 2;
            this.setState({
                freezeMultirow: freezeMultirow,
                textContent: this.state.freezeMultirow.frozenRows == 0 ? 'Freeze' : 'Unfreeze'
            });
        };
        this.state = {
            orders: getData().orders,
            layoutDefinition: getData().ldTwoLines,
            textContent: 'Freeze',
            freezeMultirow: {}
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.layoutDefinition} initialized={this.initSlip}></wjGrid.MultiRow>
            <br />
            <button className="btn btn-default" onClick={this.onFreezeClick} dangerouslySetInnerHTML={{ __html: this.state.textContent }}>
            </button>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
