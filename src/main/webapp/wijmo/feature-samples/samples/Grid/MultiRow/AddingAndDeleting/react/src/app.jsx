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
        this.onAllNewClick = (target) => {
            let adMultirow = this.state.adMultirow;
            adMultirow.allowAddNew = target.checked;
            this.setState({ adMultirow: adMultirow });
        };
        this.onAllDeleteClick = (target) => {
            let adMultirow = this.state.adMultirow;
            adMultirow.allowDelete = target.checked;
            this.setState({ adMultirow: adMultirow });
        };
        this.initialized = (adMultirow) => {
            this.setState({ adMultirow: adMultirow });
        };
        this.state = {
            newOrders: getData().addNewOrders,
            threeLines: getData().ldThreeLines,
            pageText: '',
            adMultirow: {
                allowAddNew: true,
                allowDelete: true
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.newOrders} layoutDefinition={this.state.threeLines} showGroups={false} allowAddNew={this.state.adMultirow.allowAddNew} allowDelete={this.state.adMultirow.allowDelete} initialized={this.initialized}></wjGrid.MultiRow>
            <label>
                <input id="ckbAllNew" type="checkbox" defaultChecked={true} onClick={e => this.onAllNewClick(e.target)}/>
                Allow Add New
            </label>
            <br />
            <label>
                <input id="ckbAllDelete" type="checkbox" defaultChecked={true} onClick={e => this.onAllDeleteClick(e.target)}/>
                Allow Delete
            </label>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
