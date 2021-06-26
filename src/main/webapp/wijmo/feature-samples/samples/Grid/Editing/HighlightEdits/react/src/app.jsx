import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { EditHighlighter } from './edit-highlighter';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}/>
        </div>;
    }
    // create EditHighlighter and attach it to the grid
    initializeGrid(grid) {
        new EditHighlighter(grid, 'cell-changed');
    }
    // create some random data
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
