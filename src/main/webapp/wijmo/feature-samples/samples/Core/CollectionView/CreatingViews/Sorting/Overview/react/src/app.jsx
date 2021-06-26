import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: new wijmo.CollectionView(getData())
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                <input type="radio" name="sort" value="" defaultChecked={true}/>
                No Sort
            </label>
            <label>
                <input type="radio" name="sort" value="country"/>
                Sort by Country
            </label>
            <label>
                <input type="radio" name="sort" value="country,sales"/>
                Sort by Country and Sales
            </label>
            <label>
                <input type="radio" name="sort" value="country,sales,downloads"/>
                Sort by Country, Sales, and Downloads
            </label>

            <p>
                Result:
            </p>
            <wjGrid.FlexGrid itemsSource={this.state.view} showSort={true} allowSorting={false} alternatingRowStep={0} headersVisibility="Column">
            </wjGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        document.addEventListener('change', (e) => {
            // remove the old sort
            this.state.view.sortDescriptions.clear();
            //
            // add the new sorts
            e.target.value.split(',').forEach((prop) => {
                // Sort country in ascending order, other in descending order
                this.state.view.sortDescriptions.push(new wijmo.SortDescription(prop, prop === 'country'));
            });
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
