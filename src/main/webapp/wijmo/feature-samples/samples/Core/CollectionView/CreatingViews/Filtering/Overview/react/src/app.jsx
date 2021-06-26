import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        const originalView = new wjCore.CollectionView(getData());
        this.state = {
            originalView,
            view: new wjCore.CollectionView(originalView.items)
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                <input type="radio" name="filter" value="" defaultChecked={true}/>
                No Filter
            </label>
            <label>
                <input type="radio" name="filter" value="country"/>
                US only
            </label>
            <label>
                <input type="radio" name="filter" value="sales"/>
                Sales > 9,000
            </label>
            <label>
                <input type="radio" name="filter" value="downloads"/>
                Downloads > 19,000
            </label>
            <p>
                Result ({this.state.view.items.length} items):
            </p>
            <wjGrid.FlexGrid alternatingRowStep={0} headersVisibility="Column" itemsSource={this.state.view}>
            </wjGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        document.addEventListener('change', (e) => {
            let filterType = e.target.value;
            //
            const newView = new wjCore.CollectionView(this.state.originalView.items);
            newView.filter = (item) => {
                switch (filterType) {
                    case 'country':
                        return item.country == 'US';
                    case 'sales':
                        return item.sales > 9000;
                    case 'downloads':
                        return item.downloads > 19000;
                    default:
                        return true;
                }
            };
            this.setState({
                view: newView
            });
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
