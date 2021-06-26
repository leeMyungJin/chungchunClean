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
        let data = getData().sort((a, b) => {
            return a.country < b.country
                ? -1
                : a.country > b.country
                    ? +1
                    : a.id - b.id;
        });
        this.state = {
            view: new wijmo.CollectionView(data, { useStableSort: true })
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid itemsSource={this.state.view}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
