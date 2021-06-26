import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { getFamilies, getWorkers } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAsTree: true,
            family: getFamilies(),
            workers: getWorkers(),
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Show as Tree:{' '}
                <input type="checkbox" checked={this.state.showAsTree} onChange={e => {
            this.setState({ showAsTree: !this.state.showAsTree });
        }}/>
            </label>
            <FlexGrid itemsSource={this.state.family} headersVisibility="None" childItemsPath={this.state.showAsTree ? 'children' : ''}>
                <FlexGridColumn binding="name" header="Name" width="*"/>
            </FlexGrid>
            <p>
                There are also 'heterogeneous' hierarchies, where items at different levels
                have different types and different child item properties.</p>
            <p>
                For example, the grid below is bound to a collection of 'worker' objects
                which receive 'checks' which list 'earnings':</p>
            <FlexGrid headersVisibility="Column" childItemsPath={['checks', 'earnings']} itemsSource={this.state.workers}>
                <FlexGridColumn binding="name" header="Name"/>
                <FlexGridColumn binding="hours" dataType="Number" allowSorting={false}/>
                <FlexGridColumn binding="rate" dataType="Number" allowSorting={false}/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
