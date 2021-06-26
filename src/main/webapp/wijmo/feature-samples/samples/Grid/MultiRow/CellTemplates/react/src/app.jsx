import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { MultiRow, MultiRowCell, MultiRowCellGroup, MultiRowCellTemplate } from '@grapecity/wijmo.react.grid.multirow';
import * as wjcCore from '@grapecity/wijmo';
import * as dataService from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.mrRef = React.createRef();
        //
        // 
        // The template used in more than one column is defined as a method.
        // The rest of the template functions are inlined in MultiRowCellTemplate
        // definitions.
        this.totalTemplate = (context) => {
            return <React.Fragment>
            {context.col.header}: {wjcCore.Globalize.formatNumber(context.value, 'N0')}
        </React.Fragment>;
        };
        // Another template function.
        this.rowHeaderTemplate = (context) => context.row.index / context.row.grid.rowsPerItem + 1;
        this.state = {
            itemsSource: dataService.getCv(dataService.getData()),
            countries: dataService.getCountries(),
            customTopLeft: true,
            customRowHeader: true,
            customRowHeaderEdit: true,
            customCell: true,
            customCellEdit: true,
            customGroupHeader: true,
            customColumnHeader: true,
            customGroup: true,
            highlightDownloads: true
        };
        this.totalTemplate = this.totalTemplate.bind(this);
        this.rowHeaderTemplate = this.rowHeaderTemplate.bind(this);
    }
    //
    render() {
        return <div className="container-fluid">
            <p>
                Use a <b>MultiRowCellTemplate</b> component to define a cell template.
                The <b>cellType</b> property specifies the type of cell represented by
                the template, and the <b>template</b> <i>render prop</i> accepts a
                function that renders the cells content.
                The function parameter receives an object with the cell-specific data,
                including the data item (<b>item</b>), row (<b>row</b>), and column
                (<b>col</b>) that the cell represents.
            </p>
            <p>
                Note that column-specific templates should be defined as children of
                the corresponding <b>MultiRowCell</b> component, while the others
                are defined as children of the <b>MultiRow</b> component.
            </p>
            <MultiRow ref={this.mrRef} multiRowGroupHeaders={true} itemsSource={this.state.itemsSource}>
                
                <MultiRowCellTemplate cellType="TopLeft" template={this.state.customTopLeft
            ? (context) => '№'
            : null}/>
                
                {this.state.customBottomLeft
            ? <MultiRowCellTemplate cellType="BottomLeft" template={(context) => <span>&#931;</span>}/>
            : null}
                
                <MultiRowCellTemplate cellType="RowHeader" template={this.state.customRowHeader ? this.rowHeaderTemplate : null}/>
                <MultiRowCellTemplate cellType="RowHeaderEdit" template={this.state.customRowHeaderEdit
            ? (context) => '...'
            : null}/>

                <MultiRowCellGroup header="Identity">
                    <MultiRowCell binding='id' header='ID'>
                        <MultiRowCellTemplate cellType="ColumnHeader" template={this.state.customColumnHeader
            ? (context) => <i>ID</i>
            : null}/>
                    </MultiRowCell>

                    <MultiRowCell binding='date' header='Date' colspan={1} width={140}>
                        <MultiRowCellTemplate cellType="CellEdit" template={this.state.customCellEdit
            ? (context) => {
                return <wjInput.InputDate className="cell-editor" value={context.value} valueChanged={(idt) => context.value = idt.value}>
                                    </wjInput.InputDate>;
            }
            : null}/>
                    </MultiRowCell>
                </MultiRowCellGroup>

                <MultiRowCellGroup header="Statistics" colspan={2}>
                    <MultiRowCell header="Country" binding="country" colspan={2}>
                        <MultiRowCellTemplate cellType="ColumnHeader" template={this.state.customColumnHeader
            ? (context) => {
                return <i>Country</i>;
            }
            : null}/>
                        <MultiRowCellTemplate cellType="Cell" template={this.state.customCell
            ? (context) => {
                return <React.Fragment>
                                        <img src={`resources/${context.item.country}.png`}/> {context.item.country}
                                    </React.Fragment>;
            }
            : null}/>
                        <MultiRowCellTemplate cellType="CellEdit" template={this.state.customCellEdit
            ? (context) => {
                return <wjInput.ComboBox className="cell-editor" itemsSource={this.state.countries} isEditable={false} selectedValue={context.value} selectedIndexChanged={(cb) => context.value = cb.selectedValue}>
                                    </wjInput.ComboBox>;
            }
            : null}/>
                        <MultiRowCellTemplate cellType="GroupHeader" template={this.state.customGroupHeader
            ? (context) => {
                return <React.Fragment>
                                        <input type="checkbox" checked={context.row.isCollapsed} onChange={e => context.row.isCollapsed = e.target.checked}/>&nbsp;
                                        {context.item.name} ({context.item.items.length} items)
                                    </React.Fragment>;
            }
            : null}/>
                    </MultiRowCell>

                    <MultiRowCell header="Downloads" binding="downloads" width={170} aggregate="Sum">
                        <MultiRowCellTemplate cellType="Cell" template={this.state.customCell
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
                        <MultiRowCellTemplate cellType="CellEdit" template={this.state.customCellEdit
            ? (context) => {
                return <wjInput.InputNumber className="cell-editor" step={1} value={context.value} valueChanged={(inpNum) => context.value = inpNum.value}>
                                    </wjInput.InputNumber>;
            }
            : null}/>
                        
                        <MultiRowCellTemplate cellType="Group" template={this.state.customGroup ? this.totalTemplate : null}/>
                    </MultiRowCell>

                    <MultiRowCell header="Sales" binding="sales" width={170} aggregate="Sum">
                        <MultiRowCellTemplate cellType="Cell" template={this.state.customCell
            ? (context) => {
                let style = {
                    fontWeight: 700,
                    color: ''
                }, sales = context.item.sales;
                if (this.state.highlightDownloads) {
                    style.color = sales > 3000 ? 'green' : 'red';
                }
                return <span style={style}>
                                        {sales}
                                    </span>;
            }
            : null}/>
                        <MultiRowCellTemplate cellType="CellEdit" template={this.state.customCellEdit
            ? (context) => {
                return <wjInput.InputNumber className="cell-editor" step={1} value={context.value} valueChanged={(inpNum) => context.value = inpNum.value}>
                                    </wjInput.InputNumber>;
            }
            : null}/>
                        
                        <MultiRowCellTemplate cellType="Group" template={this.state.customGroup ? this.totalTemplate : null}/>
                    </MultiRowCell>
                </MultiRowCellGroup>

            </MultiRow>
            <div className="checkbox-list">
                <div className="checkbox-list-title">Cell level templates:</div>
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

                <div className="checkbox-list-title">MultiRow level templates:</div>
                <div className="checkbox-cell">
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.customTopLeft} onChange={e => this.setState({ customTopLeft: e.target.checked })}/>
                        TopLeft
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
