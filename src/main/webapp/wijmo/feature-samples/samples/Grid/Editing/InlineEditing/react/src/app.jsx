import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid isReadOnly={true} selectionMode="None" headersVisibility="Column" initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={50}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country" isRequired={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="buttons" header="Edit" width={160}></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>

            <div id="tplBtnViewMode">
                <button id="btnEdit" className="btn btn-default btn-sm">
                    <span className="glyphicon glyphicon-pencil"></span> Edit
                </button>
                <button id="btnDelete" className="btn btn-default btn-sm">
                    <span className="glyphicon glyphicon-remove"></span> Delete
                </button>
            </div>

            <div id="tplBtnEditMode">
                <button id="btnOK" className="btn btn-primary btn-sm">
                    <span className="glyphicon glyphicon-ok"></span> OK
                </button>
                <button id="btnCancel" className="btn btn-warning btn-sm">
                    <span className="glyphicon glyphicon-ban-circle"></span> Cancel
                </button>
            </div>

        </div>;
    }
    initializeGrid(flex) {
        this.flex = flex;
        flex.rows.defaultSize = 40;
        // custom formatter to paint buttons and editors
        flex.formatItem.addHandler((s, e) => {
            if (e.panel == s.cells) {
                let col = s.columns[e.col], item = s.rows[e.row].dataItem;
                if (item == this._currentEditItem) {
                    // create editors and buttons for the item being edited
                    switch (col.binding) {
                        case 'buttons':
                            e.cell.innerHTML = document.getElementById('tplBtnEditMode').innerHTML;
                            e.cell['dataItem'] = item;
                            break;
                        case 'country':
                        case 'sales':
                        case 'expenses':
                            e.cell.innerHTML = '<input class="form-control" ' +
                                'id="' + col.binding + '" ' +
                                'value="' + s.getCellData(e.row, e.col, true) + '"/>';
                            break;
                    }
                }
                else {
                    // create buttons for items not being edited
                    switch (col.binding) {
                        case 'buttons':
                            e.cell.innerHTML = document.getElementById('tplBtnViewMode').innerHTML;
                            e.cell['dataItem'] = item;
                            break;
                    }
                }
            }
        });
        // handle button clicks
        flex.addEventListener(flex.hostElement, 'click', (e) => {
            if (e.target instanceof HTMLButtonElement) {
                // get button's data item
                let item = wjcCore.closest(e.target, '.wj-cell')['dataItem'];
                // handle buttons
                switch (e.target.id) {
                    // start editing this item
                    case 'btnEdit':
                        this._editItem(item);
                        break;
                    // remove this item from the collection
                    case 'btnDelete':
                        (flex.collectionView).remove(item);
                        break;
                    // commit edits
                    case 'btnOK':
                        this._commitEdit();
                        break;
                    // cancel edits
                    case 'btnCancel':
                        this._cancelEdit();
                        break;
                }
            }
        });
        // exit edit mode when scrolling the grid or losing focus
        flex.scrollPositionChanged.addHandler(this._cancelEdit.bind(this));
        flex.lostFocus.addHandler(this._cancelEdit.bind(this));
    }
    getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
    _editItem(item) {
        this._cancelEdit();
        this._currentEditItem = item;
        this.flex.invalidate();
    }
    _commitEdit() {
        if (this._currentEditItem) {
            this.flex.columns.forEach((col) => {
                let input = this.flex.hostElement.querySelector('#' + col.binding);
                if (input) {
                    let value = wjcCore.changeType(input.value, col.dataType, col.format);
                    if (wjcCore.getType(value) == col.dataType) {
                        this._currentEditItem[col.binding] = value;
                    }
                }
            });
        }
        this._currentEditItem = null;
        this.flex.invalidate();
    }
    _cancelEdit() {
        if (this._currentEditItem) {
            this._currentEditItem = null;
            this.flex.invalidate();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
