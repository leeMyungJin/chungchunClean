import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { GroupRow } from '@grapecity/wijmo.grid';
import { CollectionView, PropertyGroupDescription, Globalize, toggleClass } from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new CollectionView(getData(), {
                groupDescriptions: [
                    new PropertyGroupDescription('Grand Total', () => ''),
                    'country'
                ]
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid initialized={this.initializedGrid.bind(this)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" width={60} isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country"/>
                <FlexGridColumn binding="product" header="Product"/>
                <FlexGridColumn binding="sales" header="Sales" aggregate="Sum"/>
                <FlexGridColumn binding="expenses" header="Expenses" aggregate="Sum"/>
                <FlexGridColumn binding="profit" header="Profit" dataType={2} isReadOnly={true} allowSorting={false}/>
            </FlexGrid>
        </div>;
    }
    initializedGrid(flex) {
        // start collapsed
        flex.collapseGroupsToLevel(1);
        // custom cell calculation
        flex.formatItem.addHandler((s, e) => {
            // cells and column footer panels only
            if (e.panel == s.cells) {
                // get row, column, and data item (or group description)
                let r = s.rows[e.row], c = s.columns[e.col], item = s.rows[e.row].dataItem, group = r instanceof GroupRow ? item : null, negative = false; // assume value is not negative
                // calculate profit
                if (c.binding == 'profit') {
                    let profit = group
                        ? group.getAggregate('Sum', 'sales') - group.getAggregate('Sum', 'expenses')
                        : item.sales - item.expenses;
                    e.cell.textContent = Globalize.format(profit, c.format);
                    negative = profit < 0;
                }
                // update 'negative' class on cell
                toggleClass(e.cell, 'negative', negative);
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
