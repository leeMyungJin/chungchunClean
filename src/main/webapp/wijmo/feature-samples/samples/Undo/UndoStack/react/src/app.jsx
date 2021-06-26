import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ComboBox, InputNumber, InputDate, AutoComplete, MultiAutoComplete, MultiSelect } from '@grapecity/wijmo.react.input';
import { RadialGauge } from '@grapecity/wijmo.react.gauge';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { CellRangeEventArgs } from '@grapecity/wijmo.grid';
import { UndoStack } from '@grapecity/wijmo.undo';
class App extends React.Component {
    // initialize the component
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            colors: this.getColors(),
            countries: this.getCountries(),
            names: this.getNames(),
            canUndo: false,
            canRedo: false,
            actionCount: 0
        };
    }
    // enable undo/redo for the form
    componentDidMount() {
        this.undoStack = new UndoStack('#undoable-form', {
            maxActions: 50,
            stateChanged: (s) => {
                this.setState({
                    canUndo: s.canUndo,
                    canRedo: s.canRedo,
                    actionCount: s.actionCount
                });
            }
        });
    }
    // render the component
    render() {
        return <div className="container-fluid">

            
            <div className="toolbar">
                <button id="undo" className="btn btn-primary" disabled={!this.state.canUndo} onClick={() => this.undoStack.undo()}>
                    <span className="arrow">&#x21B6;</span> Undo (ctrl+Z)
                </button>{' '}
                <button id="redo" className="btn btn-primary" disabled={!this.state.canRedo} onClick={() => this.undoStack.redo()}>
                    <span className="arrow">&#x21B7;</span> Redo (ctrl+Y)
                </button>{' '}
                <button className="btn" disabled>
                    Action Count: {this.state.actionCount}
                </button>{' '}
                <button id="clear" className="btn btn-default" disabled={!this.state.actionCount} onClick={() => this.undoStack.clear()}>
                    Clear Undo/Redo Stack
                </button>
            </div>

            
            <form id="undoable-form">
                <div className="row">

                    
                    <div className="col-md-5">
                        <h3>HTML Input Elements</h3>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" className="form-control" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" className="form-control" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="select">Select</label>
                            <select id="select" className="form-control">
                                <option value="value1">Apples</option>
                                <option value="value2" selected>Oranges</option>
                                <option value="value3">Grapes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="area">TextArea</label>
                            <textarea id="area" className="form-control" placeholder="textarea"></textarea>
                        </div>
                        <div className="form-group label-indent">
                            <label className="checkbox-inline">
                                <input type="checkbox" value="red" defaultChecked={true}/> Red
                            </label>
                            <label className="checkbox-inline">
                                <input type="checkbox" value="green"/> Green
                            </label>
                            <label className="checkbox-inline">
                                <input type="checkbox" value="blue"/> Blue
                            </label>
                        </div>
                        <div className="form-group label-indent">
                            <label className="radio-inline">
                                <input type="radio" name="radio" value="hot" defaultChecked={true}/> Hot
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="radio" value="cold"/> Cold
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="radio" value="medium"/> Medium
                            </label>
                        </div>
                    </div>

                    
                    <div className="col-md-7">
                        <h3>Wijmo Controls</h3>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <ComboBox id="country" placeholder="Country" itemsSource={this.state.countries} isRequired={false} selectedIndex={-1}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <InputNumber id="amount" placeholder="Amount" format="c2" min={0} step={10} isRequired={false} value={null}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <InputDate id="date" placeholder="Date" isRequired={false} value={null}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="color" title="ComboBox">Color</label>
                            <ComboBox id="color" itemsSource={this.state.colors} isRequired={false} selectedIndex={-1}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ac" title="AutoComplete">Color</label>
                            <AutoComplete id="ac" itemsSource={this.state.colors} selectedIndex={-1}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="colors" title="MultiSelect">Colors</label>
                            <MultiSelect id="colors" itemsSource={this.state.colors}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mac" title="MultiAutoComplete">Colors</label>
                            <MultiAutoComplete id="mac" itemsSource={this.state.colors} selectedIndex={-1}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gauge">Gauge</label>
                            <RadialGauge thickness={.2} min={0} max={100} value={50} isReadOnly={false} tickSpacing={10} showTicks={true} showText="Value" needleShape="Outer" needleLength="Inner"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="grid">Grid</label>
                            <FlexGrid div id="grid" anchorCursor={true} frozenColumns={2} allowAddNew={true} allowDelete={true} itemsSource={this.state.data} initialized={s => {
            // save reference to grid
            this.grid = s;
            // add data maps to some columns
            let col = s.getColumn('name');
            col.dataMap = this.state.names;
            col.dataMap.isEditable = true;
            col = s.getColumn('country');
            col.dataMap = this.state.countries;
        }}/>
                            <button id="add-row" className="btn btn-primary" onClick={(e) => {
            let g = this.grid, view = g.editableCollectionView, newItem = view.addNew();
            g.focus();
            newItem.id = -1;
            newItem.name = 'new item';
            newItem.active = true;
            g.onRowAdded(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
            view.commitNew();
            e.preventDefault(); // don't submit the form
        }}>
                                Add Row in Code
                            </button>{' '}
                            <button id="del-row" className="btn btn-primary" onClick={(e) => {
            let g = this.grid, view = g.editableCollectionView;
            g.focus();
            if (view.items.length) {
                let sel = g.selection;
                if (sel.row > -1) {
                    let item = g.rows[sel.row].dataItem;
                    g.onDeletingRow(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
                    view.remove(item);
                }
            }
            e.preventDefault(); // don't submit the form
        }}>
                                Delete Row in Code
                            </button>{' '}
                            <label>
                                New Row At Top{' '}
                                <input id="nr-top" className="wj-no-undo" type="checkbox" onClick={e => {
            this.grid.newRowAtTop = e.target.checked;
        }}/>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>;
    }
    // create some data
    getColors() {
        return 'Black,Blue,Brown,Green,Magenta,Orange,Pink,Purple,Red,Teal,Violet,White,Yellow'.split(',');
    }
    getCountries() {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }
    getNames() {
        return 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(',');
    }
    getData() {
        let countries = this.getCountries(), names = this.getNames(), data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i,
                name: names[i % names.length],
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.round(Math.random() * 20000),
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
