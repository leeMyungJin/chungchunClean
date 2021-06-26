import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid deferResizing={true} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="ID" binding="id" width={80}/>
                <wjGrid.FlexGridColumn header="Country" binding="country"/>
                <wjGrid.FlexGridColumn header="Sales" binding="sales"/>
                <wjGrid.FlexGridColumn header="Expenses" binding="expenses"/>
            </wjGrid.FlexGrid>

            <div className="panel panel-warning">
                <div className="panel-heading">
                    To resize multiple columns at once, select a range and press the control
                    key while resizing one of the columns in the selected range.
				</div>
            </div>
        </div>;
    }
    getData() {
        // generate some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
