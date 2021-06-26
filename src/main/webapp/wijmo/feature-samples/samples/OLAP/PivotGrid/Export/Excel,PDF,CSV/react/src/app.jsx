import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as olap from '@grapecity/wijmo.olap';
import * as gridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import * as pdf from '@grapecity/wijmo.pdf';
import * as Olap from '@grapecity/wijmo.react.olap';
import { CellRange } from '@grapecity/wijmo.grid';
import { saveFile } from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new olap.PivotEngine({
                itemsSource: getData(1000),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'],
                showRowTotals: 'Subtotals',
                showColumnTotals: 'Subtotals'
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-7">
                        <Olap.PivotGrid itemsSource={this.state.ng} initialized={this._initializePivotGrid.bind(this)}></Olap.PivotGrid>
                    </div>
                </div>

                <p>
                    Export grid to:&nbsp;
                    <button id="csv" className="btn btn-primary" onClick={() => this._exportGrid('csv')}>
                        CSV
                    </button>
                    &nbsp;
                    <button id="xlsx" className="btn btn-primary" onClick={() => this._exportGrid('xlsx')}>
                        XLSX
                    </button>
                    &nbsp;
                    <button id="pdf" className="btn btn-primary" onClick={() => this._exportGrid('pdf')}>
                        PDF
                    </button>
                    &nbsp;
                    <button id="pdfdoc" className="btn btn-primary" onClick={() => this._exportGrid('pdfdoc')}>
                        PDF Document
                    </button>
                </p>

            </div>);
    }
    componentDidMount() {
        this.state.ng.fields.getField('Amount').format = 'c0';
        this.state.ng.fields.getField('Date').format = 'yyyy';
    }
    _initializePivotGrid(sender) {
        this._pivotGrid = sender;
    }
    _exportGrid(docType) {
        if (docType === 'csv') {
            let grid = this._pivotGrid, rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1), csv = grid.getClipString(rng, true, true, true); // save CSV with column and row headers
            saveFile(csv, 'PivotGrid.csv');
        }
        else if (docType === 'xlsx') {
            // create book with current view
            let book = gridXlsx.FlexGridXlsxConverter.saveAsync(this._pivotGrid, {
                includeColumnHeaders: true,
                includeRowHeaders: true
            });
            book.sheets[0].name = 'PivotGrid';
            // save the book
            book.saveAsync('PivotGrid.xlsx');
        }
        else if (docType === 'pdf') {
            gridPdf.FlexGridPdfConverter.export(this._pivotGrid, 'PivotGrid.pdf', {
                maxPages: 10,
                scaleMode: gridPdf.ScaleMode.PageWidth,
                documentOptions: {
                    compress: true,
                    header: { declarative: { text: '\t&[Page] of &[Pages]' } },
                    footer: { declarative: { text: '\t&[Page] of &[Pages]' } },
                    info: { author: 'GrapeCity', title: 'PivotGrid' }
                },
                styles: {
                    cellStyle: { backgroundColor: '#ffffff', borderColor: '#c6c6c6' },
                    altCellStyle: { backgroundColor: '#f9f9f9' },
                    groupCellStyle: { backgroundColor: '#dddddd' },
                    headerCellStyle: { backgroundColor: '#eaeaea' }
                }
            });
        }
        else if (docType === 'pdfdoc') {
            // create the document
            let doc = new pdf.PdfDocument({
                compress: true,
                header: { declarative: { text: '\t&[Page]\\&[Pages]' } },
                ended: (sender, args) => {
                    pdf.saveBlob(args.blob, 'PivotGridDoc.pdf');
                }
            });
            // add some content
            doc.drawText('This is a PivotGrid control:');
            // add the grid (400pt wide)
            gridPdf.FlexGridPdfConverter.draw(this._pivotGrid, doc, 400);
            // finish document
            doc.end();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
