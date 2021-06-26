import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this._data = new wijmo.CollectionView(getData(), {
            groupDescriptions: ['country'] // group data by country
        });
    }
    render() {
        return <div className="container-fluid">
            <div id="log">please move the mouse over the grid</div>
            <wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} formatItem={this.formatFlexGrid.bind(this)} itemsSource={this._data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(sender) {
        sender.addEventListener(sender.hostElement, 'mousemove', e => {
            let ht = sender.hitTest(e), logText = `panel <b>${grid.CellType[ht.cellType]}</b> row <b>${ht.row}</b> col <b>${ht.col}</b>`;
            if (e.target.classList.contains('my-button')) {
                logText += ' (fake button!)';
            }
            else if (e.target.tagName == 'INPUT' && e.target.type == 'checkbox') {
                logText += ' (checkbox!)';
            }
            else if (ht.panel == sender.cells) {
                if (sender.rows[ht.row] instanceof grid.GroupRow) {
                    logText += ' (group row)';
                }
                else {
                    logText += ' (value: <b>' + sender.cells.getCellData(ht.row, ht.col, true) + '</b>)';
                }
            }
            document.querySelector('#log').innerHTML = logText;
        });
    }
    formatFlexGrid(sender, e) {
        // add 'button' to country cells
        if (e.panel == sender.cells) {
            if (sender.columns[e.col].binding == 'country' && !(sender.rows[e.row] instanceof grid.GroupRow)) {
                if (sender.editRange != null && sender.editRange.contains(e.row, e.col)) {
                    let spanEle = document.createElement('span');
                    spanEle.className = 'my-button';
                    spanEle.innerHTML = '&#x2b24;';
                    sender.activeEditor.style.width = '75%';
                    e.cell.insertBefore(spanEle, sender.activeEditor);
                }
                else {
                    let html = '<span class="my-button">&#x2b24;</span>' + e.cell.innerHTML;
                    e.cell.innerHTML = html;
                }
            }
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
