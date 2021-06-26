import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjMultiRow from '@grapecity/wijmo.react.grid.multirow';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { generateLayoutDef, getPurchaseSlip } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialized = (purchaseSlip) => {
            this.setState({
                purchaseSlip: purchaseSlip,
                cv: purchaseSlip.collectionView
            }, () => {
                this.state.purchaseSlip.columnFooters.rows.push(new wjGrid.Row());
                this.state.purchaseSlip.columnFooters.setCellData(0, 3, 'Summary');
                this.state.purchaseSlip.columnFooters.setCellData(0, 6, 'Amount Summary');
                this._updateSummary();
                let cv = this.state.cv;
                cv.collectionChanged.addHandler((sender, e) => {
                    let quantity, unitCost;
                    if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                        quantity = +e.item.quantity;
                        unitCost = +e.item.unitCost;
                        if (!isNaN(quantity) && !isNaN(unitCost)) {
                            e.item.cost = quantity * unitCost;
                            e.item.price = e.item.cost * 1.35;
                            this._updateSummary();
                        }
                    }
                });
            });
        };
        this.onExportXlsxClick = () => {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.state.purchaseSlip, null, 'PurchaseSlip.xlsx');
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
                    wjPdf.saveBlob(args.blob, 'PurchaseSlip.pdf');
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
            wjGridPdf.FlexGridPdfConverter.draw(this.state.purchaseSlip, doc, null, null, settings);
            doc.end();
        };
        this._updateSummary = () => {
            let qtySum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.state.cv.items, 'quantity'), costSum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.state.cv.items, 'cost'), priceSum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.state.cv.items, 'price');
            this.state.purchaseSlip.columnFooters.setCellData(0, 4, qtySum);
            this.state.purchaseSlip.columnFooters.setCellData(0, 7, wjCore.Globalize.format(costSum, 'c2'));
            this.state.purchaseSlip.columnFooters.setCellData(0, 8, wjCore.Globalize.format(priceSum, 'c2'));
        };
        this.state = {
            data: getPurchaseSlip(),
            layoutDefinition: generateLayoutDef(),
            purchaseSlip: null,
            cv: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjMultiRow.MultiRow id="orderDetail" itemsSource={this.state.data} layoutDefinition={this.state.layoutDefinition} initialized={this.initialized}></wjMultiRow.MultiRow>
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
