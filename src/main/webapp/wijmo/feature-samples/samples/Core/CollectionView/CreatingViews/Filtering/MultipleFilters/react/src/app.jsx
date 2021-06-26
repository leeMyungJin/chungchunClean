import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CollectionView, Globalize } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.filterText = '';
        // create CollectionView, add country filter
        let view = new CollectionView(getData(), {
            collectionChanged: (s) => {
                this.setState({ itemCount: s.totalItemCount });
            }
        });
        view.filters.push(item => {
            let text = this.filterText;
            return !text || item.country.toLowerCase().indexOf(text) > -1;
        });
        // add view to state
        this.state = {
            itemCount: view.totalItemCount,
            view: view
        };
    }
    setCountryFilter(text) {
        this.filterText = text;
        this.state.view.refresh();
    }
    render() {
        return <div className="container-fluid">
            <input className="form-control" placeholder="country filter" onInput={e => this.setCountryFilter(e.target.value)}/>
            <p>
                Result ({Globalize.format(this.state.itemCount, 'n0')} items):
            </p>
            <FlexGrid alternatingRowStep={0} headersVisibility="Column" itemsSource={this.state.view}>
                <FlexGridFilter />
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
