import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as dataService from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        // 
        // The template used in more than one cell type is defined as a method.
        // The rest of the template functions are inlined in FlexGridCellTemplate
        // definitions.
        this.totalTemplate = (context) => {
            return <React.Fragment>
            Sum: {wjcCore.Globalize.formatNumber(context.value, 'N0')}
        </React.Fragment>;
        };
        // Another template function.
        this.rowHeaderTemplate = (context) => context.row.index + 1;
        this.state = {
            itemsSource: dataService.getCv(dataService.getData()),
            countries: dataService.getCountries(),
            customTopLeft: true,
            customBottomLeft: true,
            customRowHeader: true,
            customRowHeaderEdit: true,
            customCell: true,
            customCellEdit: true,
            customGroupHeader: true,
            customColumnHeader: true,
            customGroup: true,
            customColumnFooter: true,
            highlightDownloads: true
        };
        this.initialized = this.initialized.bind(this);
        this.totalTemplate = this.totalTemplate.bind(this);
        this.rowHeaderTemplate = this.rowHeaderTemplate.bind(this);
    }
    //
    // Wijmo event handlers
    initialized(grid, e) {
        grid.columnFooters.rows.push(new wjcGrid.GroupRow());
    }
    //
    render() {
        return <div className="container-fluid">
            <p>
                Use a <b>FlexGridCellTemplate</b> component to define a cell template.
                The <b>cellType</b> property specifies the type of cell represented by
                the template, and the <b>template</b> <i>render prop</i> accepts a
                function that renders the cells content.
                The function parameter receives an object with the cell-specific data,
                including the data item (<b>item</b>), row (<b>row</b>), and column
                (<b>col</b>) that the cell represents.
            </p>
            <p>
                Note that column-specific templates should be defined as children of
                the corresponding <b>FlexGridColumn</b> component, while the others
                are defined as children of the <b>FlexGrid</b> component.
            </p>
            <wjGrid.FlexGrid itemsSource={this.state.itemsSource} allowSorting={false} autoSizeMode="Both" allowResizing="Both" deferResizing={true} initialized={this.initialized}>
                
                <wjGrid.FlexGridCellTemplate cellType="TopLeft" template={this.state.customTopLeft
            ? (context) => '№'
            : null}/>
                
                {this.state.customBottomLeft
            ? <wjGrid.FlexGridCellTemplate cellType="BottomLeft" template={(context) => <span>&#931;</span>}/>
            : null}
                
                <wjGrid.FlexGridCellTemplate cellType="RowHeader" template={this.state.customRowHeader ? this.rowHeaderTemplate : null}/>
                <wjGrid.FlexGridCellTemplate cellType="RowHeaderEdit" template={this.state.customRowHeaderEdit
            ? (context) => '...'
            : null}/>

                <wjGrid.FlexGridColumn header="Country" binding="country" width="*">
                    <wjGrid.FlexGridCellTemplate cellType="Cell" template={this.state.customCell
            ? (context) => {
                return <React.Fragment>
                                    <img src={`resources/${context.item.country}.png`}/> {context.item.country}
                                </React.Fragment>;
            }
            : null}/>
                    <wjGrid.FlexGridCellTemplate cellType="CellEdit" template={this.state.customCellEdit
            ? (context) => {
                return <wjInput.ComboBox className="cell-editor" itemsSource={this.state.countries} isEditable={false} selectedValue={context.value} selectedIndexChanged={(cb) => context.value = cb.selectedValue}>
                                </wjInput.ComboBox>;
            }
            : null}/>
                    <wjGrid.FlexGridCellTemplate cellType="GroupHeader" template={this.state.customGroupHeader
            ? (context) => {
                return <React.Fragment>
                                    <input type="checkbox" checked={context.row.isCollapsed} onChange={e => context.row.isCollapsed = e.target.checked}/>
                                    {context.item.name} ({context.item.items.length} items)
                                </React.Fragment>;
            }
            : null}/>
                </wjGrid.FlexGridColumn>

                <wjGrid.FlexGridColumn header="Downloads" binding="downloads" width={170} aggregate="Sum">
                    <wjGrid.FlexGridCellTemplate cellType="ColumnHeader" template={this.state.customColumnHeader
            ? (context) => {
                return <React.Fragment>
                                    <input type="checkbox" checked={this.state.highlightDownloads} onChange={(e) => {
                    this.setState({ highlightDownloads: e.target.checked });
                }}/>
                                    Downloads
                                </React.Fragment>;
            }
            : null}/>
                    <wjGrid.FlexGridCellTemplate cellType="Cell" template={this.state.customCell
            ? (context) => {
                let style = {
                    fontWeight: 700,
                    color: ''
                }, downloads = context.item.downloads;
                if (this.state.highlightDownloads) {
                    style.color = downloads > 10000 ? 'green' : 'red';
                }
                return <span style={style}>
                                    {downloads}
                                </span>;
            }
            : null}/>
                    <wjGrid.FlexGridCellTemplate cellType="CellEdit" template={this.state.customCellEdit
            ? (context) => {
                return <wjInput.InputNumber className="cell-editor" step={1} value={context.value} valueChanged={(inpNum) => context.value = inpNum.value}>
                                </wjInput.InputNumber>;
            }
            : null}/>
                    
                    <wjGrid.FlexGridCellTemplate cellType="Group" template={this.state.customGroup ? this.totalTemplate : null}/>
                    <wjGrid.FlexGridCellTemplate cellType="ColumnFooter" template={this.state.customColumnFooter ? this.totalTemplate : null}/>
                </wjGrid.FlexGridColumn>

            </wjGrid.FlexGrid>
            <div className="checkbox-list">
                <div className="checkbox-list-title">Column level templates:</div>
                <div className="checkbox-cell">
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customCell} onChange={e => this.setState({ customCell: e.target.checked })}/>
                        Cell
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customCellEdit} onChange={e => this.setState({ customCellEdit: e.target.checked })}/>
                        CellEdit
                    </label>
                </div>
                <div className="checkbox-cell">
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customColumnHeader} onChange={e => this.setState({ customColumnHeader: e.target.checked })}/>
                        ColumnHeader
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customColumnFooter} onChange={e => this.setState({ customColumnFooter: e.target.checked })}/>
                        ColumnFooter
                    </label>
                </div>
                <div className="checkbox-cell">
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customGroupHeader} onChange={e => this.setState({ customGroupHeader: e.target.checked })}/>
                        GroupHeader
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customGroup} onChange={e => this.setState({ customGroup: e.target.checked })}/>
                        Group
                    </label>
                </div>

                <div className="checkbox-list-title">Grid level templates:</div>
                <div className="checkbox-cell">
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customTopLeft} onChange={e => this.setState({ customTopLeft: e.target.checked })}/>
                        TopLeft
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customBottomLeft} onChange={e => this.setState({ customBottomLeft: e.target.checked })}/>
                        BottomLeft
                    </label>
                </div>
                <div className="checkbox-cell">
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customRowHeader} onChange={e => this.setState({ customRowHeader: e.target.checked })}/>
                        RowHeader
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customRowHeaderEdit} onChange={e => this.setState({ customRowHeaderEdit: e.target.checked })}/>
                        RowHeaderEdit
                    </label>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
