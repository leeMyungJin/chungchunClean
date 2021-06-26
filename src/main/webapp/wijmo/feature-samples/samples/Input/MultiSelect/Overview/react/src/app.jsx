import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = getData();
        this.state = {
            showSelectAllCheckbox: false,
            showFilterInput: false,
            checkedItems: []
        };
        this.onCheckedItemsChanged = this.onCheckedItemsChanged.bind(this);
        this.changeShowSelectAll = this.changeShowSelectAll.bind(this);
        this.changeShowFilterInput = this.changeShowFilterInput.bind(this);
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-5">
                    <div className="form-group">
                        <wjInput.MultiSelect placeholder="Countries" headerFormat="{count:n0} countries" displayMemberPath="country" showSelectAllCheckbox={this.state.showSelectAllCheckbox} showFilterInput={this.state.showFilterInput} itemsSource={this.data} checkedItemsChanged={this.onCheckedItemsChanged}>
                        </wjInput.MultiSelect>
                    </div>
                    <div className="form-group">
                        <label>
                            Show "Select All" box
                            <input id="selectAll" type="checkbox" checked={this.state.showSelectAllCheckbox} onChange={this.changeShowSelectAll}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Show "Filter" input
                            <input id="filter" type="checkbox" checked={this.state.showFilterInput} onChange={this.changeShowFilterInput}/>
                        </label>
                    </div>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Checked Items:</b>
                    </p>
                    <ul>
                        {this.state.checkedItems.map((item, index) => {
            return <li key={index}>
                                    {item.country}
                                </li>;
        })}
                    </ul>
                </div>
            </div>
        </div>;
    }
    onCheckedItemsChanged(sender) {
        this.setState({ checkedItems: sender.checkedItems });
    }
    changeShowSelectAll(event) {
        this.setState({ showSelectAllCheckbox: event.target.checked });
    }
    changeShowFilterInput(event) {
        this.setState({ showFilterInput: event.target.checked });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
