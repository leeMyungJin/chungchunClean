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
        this.state = {
            data: getData(),
            showSelectAllCheckbox: false,
            checkedItems: []
        };
    }
    _changeShowSelectAll(value) {
        this.setState({ showSelectAllCheckbox: value });
    }
    _onCheckedItemsChanged(sender) {
        this.setState({ checkedItems: sender.checkedItems });
    }
    render() {
        return <div className="container-fluid">
            <p>
                This MultiSelect uses a <b>wjItemTemplate</b> <i>render prop</i> to customize the display 
                of the items in the drop-down list.
            </p>
            <div className="row">
                <div className="col-xs-5">
                    <div className="form-group">
                        <wjInput.MultiSelect displayMemberPath="name" headerPath="name" placeholder="Countries" itemsSource={this.state.data} showSelectAllCheckbox={this.state.showSelectAllCheckbox} checkedItemsChanged={this._onCheckedItemsChanged.bind(this)} wjItemTemplate={(context) => (<div className="item">
                                    <label><input type="checkbox"/>{context.item.name}</label>
                                    <br />
                                    <b>{context.item.city}</b> ({context.item.state})<br />
                                    {context.item.address}<br />
                                    Phone: <b>{context.item.phone}</b><br />
                                    Fax: <b>{context.item.fax}</b><br />
                                    Website: <a href="{context.item.site}" target="_blank">{context.item.site}</a><br />
                                </div>)}>
                        </wjInput.MultiSelect>
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectAll">Show "Select All" box</label>{' '}
                        <input id="selectAll" type="checkbox" defaultChecked={this.state.showSelectAllCheckbox} onChange={e => this._changeShowSelectAll(e.target.checked)}/>
                    </div>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Checked Items:</b>
                    </p>
                    <ul>
                        {this.state.checkedItems.map((item) => {
            return <li key={item.name}>
                                    {item.name}
                                </li>;
        })}
                    </ul>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
