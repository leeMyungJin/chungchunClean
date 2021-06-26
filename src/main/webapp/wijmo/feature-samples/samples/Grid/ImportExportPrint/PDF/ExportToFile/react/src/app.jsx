import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import { PdfPageOrientation } from '@grapecity/wijmo.pdf';
import { ExportMode, ScaleMode, FlexGridPdfConverter } from '@grapecity/wijmo.grid.pdf';
import * as wjcGrid from '@grapecity/wijmo.react.grid';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._data = getData(25);
        this.state = {
            scaleMode: ScaleMode.ActualSize,
            exportMode: ExportMode.All,
            orientation: PdfPageOrientation.Portrait
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            Export Settings
                        </h4>
                    </div>
                    <div className="panel-body">
                        <ul className="list-inline">
                            <li>
                                <wjInput.Menu header='Scale mode' itemClicked={this._valueChanged.bind(this, 'scaleMode')} value={this.state.scaleMode}>
                                    <wjInput.MenuItem value={ScaleMode.ActualSize}>
                                        ActualSize
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={ScaleMode.PageWidth}>
                                        PageWidth
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={ScaleMode.SinglePage}>
                                        SinglePage
                                    </wjInput.MenuItem>
                                </wjInput.Menu>
                            </li>
                            <li>
                                <wjInput.Menu header='Orientation' itemClicked={this._valueChanged.bind(this, 'orientation')} value={this.state.orientation}>
                                    <wjInput.MenuItem value={PdfPageOrientation.Portrait}>
                                        Portrait
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={PdfPageOrientation.Landscape}>
                                        Landscape
                                    </wjInput.MenuItem>
                                </wjInput.Menu>
                            </li>
                            <li>
                                <wjInput.Menu header='Export mode' itemClicked={this._valueChanged.bind(this, 'exportMode')} value={this.state.exportMode}>
                                    <wjInput.MenuItem value={ExportMode.All}>
                                        All
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={ExportMode.Selection}>
                                        Selection
                                    </wjInput.MenuItem>
                                </wjInput.Menu>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            
            <button className="btn btn-default" onClick={this._exportPDF.bind(this)}>Export</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} selectionMode="ListBox" headersVisibility="All" itemsSource={this._data} initialized={this._initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Start Date" binding="start" format="d" minWidth={80}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="End Date" binding="end" format="d" minWidth={80}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c" aggregate="Sum"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Color" binding="color"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Pending" binding="amount2" format="c2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        if (this._flexGrid) {
            this._applyGroupBy(this._flexGrid);
        }
    }
    _initializeGrid(source) {
        this._flexGrid = source;
    }
    _valueChanged(stateProp, source) {
        if (source.selectedValue) {
            this.setState({ [stateProp]: source.selectedValue });
        }
    }
    _exportPDF() {
        FlexGridPdfConverter.export(this._flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            exportMode: this.state.exportMode,
            scaleMode: this.state.scaleMode,
            documentOptions: {
                pageSettings: {
                    layout: this.state.orientation
                },
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                }
            },
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        });
    }
    _applyGroupBy(flexGrid) {
        let groupNames = ['Product', 'Country', 'Amount'];
        // get the collection view, start update
        let cv = flexGrid.collectionView;
        cv.beginUpdate();
        // clear existing groups
        cv.groupDescriptions.clear();
        // add new groups
        for (let i = 0; i < groupNames.length; i++) {
            let propName = groupNames[i].toLowerCase();
            //
            if (propName == 'amount') {
                // group amounts in ranges
                // (could use the mapping function to group countries into continents, 
                // names into initials, etc)
                let groupDesc = new wijmo.PropertyGroupDescription(propName, (item, prop) => {
                    let value = item[prop];
                    if (value > 1000)
                        return 'Large Amounts';
                    if (value > 100)
                        return 'Medium Amounts';
                    if (value > 0)
                        return 'Small Amounts';
                    return 'Negative';
                });
                cv.groupDescriptions.push(groupDesc);
            }
            else {
                if (propName) {
                    // group other properties by their specific values
                    let groupDesc = new wijmo.PropertyGroupDescription(propName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }
        }
        // done updating
        cv.endUpdate();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
