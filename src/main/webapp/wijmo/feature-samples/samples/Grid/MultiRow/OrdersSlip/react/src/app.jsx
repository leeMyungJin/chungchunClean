import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { generateLayoutDef, generateOrdersSlipData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initSlip = (ordersSlip) => {
            this.setState({ ordersSlip: ordersSlip });
        };
        this.onExportXlsxClick = () => {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.state.ordersSlip, null, 'OrdersSlip.xlsx');
        };
        this.onExportPdfClick = () => {
            let doc = new wjPdf.PdfDocument({
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                ended: function (sender, args) {
                    wjPdf.saveBlob(args.blob, 'OrdersSlip.pdf');
                }
            }), settings = {
                styles: {
                    cellStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#c6c6c6'
                    },
                    altCellStyle: {
                        backgroundColor: '#C0FFC0'
                    },
                    headerCellStyle: {
                        backgroundColor: '#eaeaea'
                    }
                }
            };
            wjGridPdf.FlexGridPdfConverter.draw(this.state.ordersSlip, doc, null, null, settings);
            doc.end();
        };
        this._getData = () => {
            let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
            for (let i = 0; i < countries.length; i++) {
                data.push({
                    country: countries[i],
                    downloads: Math.round(Math.random() * 20000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        };
        this._currentPageChanged = () => {
            let curr = wjCore.format('{current:n0} / {count:n0}', {
                current: this.state.cv.pageIndex + 1,
                count: this.state.cv.pageCount
            });
            this.setState({ currentDescription: curr });
            if (this.state.cv.pageIndex === 0) {
                document.querySelector('#first').setAttribute('disabled', 'true');
                document.querySelector('#previous').setAttribute('disabled', 'true');
            }
            else {
                document.querySelector('#first').removeAttribute('disabled');
                document.querySelector('#previous').removeAttribute('disabled');
            }
            if (this.state.cv.pageIndex === this.state.cv.pageCount - 1) {
                document.querySelector('#last').setAttribute('disabled', 'true');
                document.querySelector('#next').setAttribute('disabled', 'true');
            }
            else {
                document.querySelector('#last').removeAttribute('disabled');
                document.querySelector('#next').removeAttribute('disabled');
            }
        };
        this.state = {
            data: generateOrdersSlipData(),
            layoutDefinition: generateLayoutDef(),
            ordersSlip: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.data} layoutDefinition={this.state.layoutDefinition} initialized={this.initSlip}></wjGrid.MultiRow>
            <div className="btn-group">
                <button className="btn btn-default" onClick={this.onExportXlsxClick}>
                    Export to Excel
            </button>
                <button className="btn btn-default" onClick={this.onExportPdfClick}>
                    Export to PDF
            </button>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
