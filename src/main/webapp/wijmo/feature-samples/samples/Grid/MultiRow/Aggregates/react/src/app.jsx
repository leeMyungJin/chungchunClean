import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MultiRow } from '@grapecity/wijmo.react.grid.multirow';
import { getGroupedData, getLayoutDefinition } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getGroupedData(200),
            layout: getLayoutDefinition(),
            multiRowGroupHeaders: true
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                multiRowGroupHeaders:
                <input type="checkbox" defaultChecked={this.state.multiRowGroupHeaders} onClick={e => {
            this.setState({ multiRowGroupHeaders: e.target.checked });
        }}/>
            </label> 
            <MultiRow itemsSource={this.state.data} layoutDefinition={this.state.layout} multiRowGroupHeaders={this.state.multiRowGroupHeaders} initialized={sender => sender.collapseGroupsToLevel(1)}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
