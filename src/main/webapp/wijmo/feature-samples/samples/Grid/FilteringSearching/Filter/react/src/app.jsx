import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="input-group">
                <div className="input-group-addon">
                    <span className="glyphicon glyphicon-search"></span>
                </div>
                <input onInput={this.filter.bind(this)} className="form-control" placeholder="Country Filter"/>        
            </div>
           
            <wjGrid.FlexGrid initialized={this.initialized.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    filter(e) {
        console.log("filter " + e);
        let filter = e.target.value.toLowerCase();
        this.flex.collectionView.filter = item => {
            return (filter.length == 0 ||
                item.country.toLowerCase().indexOf(filter) > -1);
        };
    }
    initialized(flex) {
        this.flex = flex;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
