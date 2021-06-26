import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid allowSorting={false} allowDragging={false} selectionMode="MultiRange" itemsSource={this.state.data}/>
        </div>;
    }
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                num1: Math.random() * 5000,
                num2: Math.random() * 5000,
                num3: Math.random() * 5000,
                num4: Math.random() * 5000,
                num5: Math.random() * 5000,
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
