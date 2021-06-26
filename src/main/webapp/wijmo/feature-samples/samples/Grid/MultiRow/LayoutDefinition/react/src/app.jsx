import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        let appData = getData();
        let orders = appData.orders;
        let layoutDefs = appData.layoutDefs;
        let currentLayout = appData.layoutDefs.currentItem;
        this.state = {
            orders,
            layoutDefs,
            currentLayout
        };
        layoutDefs.currentChanged.addHandler(() => {
            this.setState({
                currentLayout: layoutDefs.currentItem
            });
        });
    }
    //
    render() {
        return <div className="container-fluid">
            <label>
                Layout option:
                <wjInput.ComboBox itemsSource={this.state.layoutDefs} displayMemberPath="name">
                </wjInput.ComboBox>
            </label>
            <p>{this.state.currentLayout.description}</p>
            <wjGrid.MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.currentLayout.def}>
            </wjGrid.MultiRow>
        </div>;
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
