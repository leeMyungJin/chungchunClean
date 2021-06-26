import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { Tooltip, toggleClass } from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this._getData(200)
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid alternatingRowStep={0} lazyRender={false} initialized={this.initializeGrid} itemsSource={this.state.data}>
                <FlexGridColumn binding="country" header="Country"/>
                <FlexGridColumn binding="downloads" header="Downloads" format="n0"/>
                <FlexGridColumn binding="active" header="Active"/>
                <FlexGridColumn binding="sales" header="Sales" format="n0"/>
                <FlexGridColumn binding="expenses" header="Expenses" format="n0"/>
            </FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        let tooltip = new Tooltip();
        flex.formatItem.addHandler((s, e) => {
            if (e.panel == s.cells) {
                let item = s.rows[e.row].dataItem, binding = s.columns[e.col].binding, note = item.notes ? item.notes[binding] : null;
                toggleClass(e.cell, 'wj-has-notes', note != null);
                if (note != null) {
                    tooltip.setTooltip(e.cell, '<b>Note:</b><br/>' + note);
                }
            }
        });
        // clear all tooltips when updating the view
        flex.updatingView.addHandler(() => {
            tooltip.dispose();
        });
    }
    _getData(cnt) {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        // create the data
        for (let i = 0; i < cnt; i++) {
            data.push({
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        // add some notes
        for (let i = 0; i < data.length; i++) {
            let item = data[i], notes = {};
            if (item.sales < 5000) {
                notes.sales = 'What\'s going on in <b>' + item.country + '</b>?';
            }
            if (item.downloads < 20000) {
                notes.downloads = 'Too few downloads, check adwords...';
            }
            if (item.expenses > 40000) {
                notes.expenses = 'We\'re spending too much here!';
            }
            if (item.country == countries[0] && !item.active) {
                notes.country = 'Why isn\'t this active?';
            }
            if (Object.keys(notes).length) {
                item.notes = notes;
            }
        }
        // done
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
