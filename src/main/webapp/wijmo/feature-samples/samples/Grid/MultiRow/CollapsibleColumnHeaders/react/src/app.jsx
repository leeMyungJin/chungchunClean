import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MultiRow } from '@grapecity/wijmo.react.grid.multirow';
import { ComboBox } from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: getData().orders,
            threeLines: getData().ldThreeLines,
            cbCollapsedHeadersSource: [
                { name: "true", value: true },
                { name: "false", value: false },
                { name: "null", value: null }
            ],
            showHeaderCollapseButton: true,
            collapsedHeaders: true,
        };
    }
    render() {
        return <div className="container-fluid">
            <MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.threeLines} showHeaderCollapseButton={this.state.showHeaderCollapseButton} collapsedHeaders={this.state.collapsedHeaders} collapsedHeadersChanged={s => this.setState({ collapsedHeaders: s.collapsedHeaders })}/>
            <div>
                <label>
                    Collapsed Headers{' '}
                    <ComboBox itemsSource={this.state.cbCollapsedHeadersSource} displayMemberPath="name" selectedValuePath="value" selectedValue={this.state.collapsedHeaders} selectedIndexChanged={s => this.setState({ collapsedHeaders: s.selectedValue })}/>
                </label>
                <label>
                    Show Header Collapse Button{' '}
                    <input type="checkbox" defaultChecked={true} onChange={e => this.setState({ showHeaderCollapseButton: e.target.checked })}/>
                </label>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
