import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.sort = (ascending) => {
            // sort JavaScript array
            this.setState({ array: this.state.array.sort() });
            if (!ascending) {
                this.setState({ array: this.state.array.reverse() });
            }
            //
            // sort CollectionView
            this.state.view.sortDescriptions.clear();
            this.state.view.sortDescriptions.push(new wijmo.SortDescription(null, ascending));
        };
        this.state = {
            array: getData(),
            view: new wijmo.CollectionView(getData())
        };
    }
    render() {
        return <div className="container-fluid">
            <button className="btn" onClick={e => this.sort(true)}>Sort Ascending</button>
            <button className="btn" onClick={e => this.sort(false)}>Sort Descending</button>

            <div className="row">
                <div className="col-xs-6">
                    <h4>
                        JavaScript array.sort:
                    </h4>
                    <ol>
                        {this.state.array.map((item) => {
            return <li key="item">
                                    {item}
                                </li>;
        })}
                    </ol>
                </div>
                <div className="col-xs-6">
                    <h4>
                        CollectionView.sort:
                    </h4>
                    <ol>
                        {this.state.view.items.map((item) => {
            return <li key={item}>
                                    {item}
                                </li>;
        })}
                    </ol>
                </div>
            </div>
        </div>;
    }
    componentDidMount() {
        this.sort(true);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
