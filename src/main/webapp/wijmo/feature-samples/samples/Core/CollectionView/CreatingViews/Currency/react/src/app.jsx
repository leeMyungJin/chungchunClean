import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatData = (value, fmt) => {
            return wjCore.Globalize.format(value, fmt);
        };
        this.onSelectedIndexChanged = (sender) => {
            this.setState({
                currentItem: sender.selectedItem
            });
        };
        const data = new wjCore.CollectionView(getData(), { sortDescriptions: ['country'] });
        this.state = {
            view: data,
            currentItem: data.currentItem
        };
    }
    render() {
        return <div className="container-fluid">
            <table className="table table-condensed">
                <tr>
                    <td>Country</td>
                    <td>
                        <wjInput.ComboBox itemsSource={this.state.view} selectedIndexChanged={this.onSelectedIndexChanged} displayMemberPath="country">
                        </wjInput.ComboBox>
                    </td>
                </tr>
                <tr>
                    <td>Downloads</td>
                    <td>{this.formatData(this.state.currentItem.downloads, 'n0')}</td>
                </tr>
                <tr>
                    <td>Sales</td>
                    <td>{this.formatData(this.state.currentItem.sales, 'c')}</td>
                </tr>
                <tr>
                    <td>Expenses</td>
                    <td>{this.formatData(this.state.currentItem.expenses, 'c')}</td>
                </tr>
            </table>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
