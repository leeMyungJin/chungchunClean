import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from "@grapecity/wijmo";
import * as wjInput from "@grapecity/wijmo.react.input";
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateShowGroupsStatus = (target) => {
            this.setState({ showGroups: target.checked });
        };
        // create GroupDescription to group by initial
        let gdInitial = new wijmo.GroupDescription();
        gdInitial.groupNameFromItem = item => item[0];
        this.state = {
            view: new wijmo.CollectionView(getData(), {
                sortDescriptions: [''],
                groupDescriptions: [gdInitial],
                currentItem: null
            }),
            showGroups: true
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-check">
                <label htmlFor="showGroups" className="form-check-label">Show Groups</label>
                <input id="showGroups" className="form-check-input" type="checkbox" defaultChecked={true} onChange={e => { this.updateShowGroupsStatus(e.target); }}/>
            </div>

            <div className="row">
                <div className="col-xs-6">
                    <h4>
                        ComboBox:
                </h4>
                    <wjInput.ComboBox itemsSource={this.state.view} showGroups={this.state.showGroups}></wjInput.ComboBox>
                </div>
                <div className="col-xs-6">
                    <h4>
                        ListBox:
                </h4>
                    <wjInput.ListBox itemsSource={this.state.view} showGroups={this.state.showGroups}></wjInput.ListBox>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
