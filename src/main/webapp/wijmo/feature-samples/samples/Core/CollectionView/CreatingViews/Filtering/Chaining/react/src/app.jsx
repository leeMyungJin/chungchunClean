import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjGridFilter from '@grapecity/wijmo.react.grid.filter';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.view = new wjCore.CollectionView(getData());
        this.view2 = new wjCore.CollectionView();
        this.updateFilter = (e) => {
            this.setState({ filter: e.target.value }, () => {
                this.filterView(this.state.filter);
            });
        };
        this.collectionChanged = (sender) => {
            this.setState({ counter: sender.items.length });
        };
        this.state = {
            filter: '',
            counter: this.view.items.length,
        };
        this.view2.sourceCollection = this.view.items;
        this.view2.collectionChanged.addHandler(this.collectionChanged);
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group row">
                <div className="col-md-2">
                    <input className="form-control" placeholder="country filter" value={this.state.filter} onChange={this.updateFilter}/>
                </div>
            </div>

            <p>
                Result ({this.state.counter} items):
            </p>
            <wjGrid.FlexGrid alternatingRowStep={0} headersVisibility="Column" itemsSource={this.view2}>
                <wjGridFilter.FlexGridFilter></wjGridFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
    filterView(filter = '') {
        let filterText = filter.toLowerCase();
        this.view.filter = (item) => {
            return filterText
                ? item.country.toLowerCase().indexOf(filterText) > -1
                : true;
        };
        this.view2.sourceCollection = this.view.items;
        this.setState({ counter: this.view2.items.length });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
