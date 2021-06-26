import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjCore from '@grapecity/wijmo';
import * as wjFilter from '@grapecity/wijmo.grid.filter';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { generateSlipData, generateLayoutDef } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initSlip = (slip) => {
            this.setState({
                transferSlip: slip,
                cv: slip.collectionView
            }, () => {
                let filter = new wjFilter.FlexGridFilter(this.state.transferSlip);
                this.state.transferSlip.rowHeaders.columns.clear();
                this.setState({ cv: this.state.transferSlip.collectionView });
                this._currentPageChanged();
                this._updateSummary();
                let cv = this.state.cv, transferSlip = this.state.transferSlip;
                transferSlip.cellEditEnded.addHandler(() => {
                    this._updateSummary();
                });
                cv.pageChanged.addHandler(() => {
                    this._updateSummary();
                    this._currentPageChanged();
                });
                cv.collectionChanged.addHandler((sender, e) => {
                    let debtorAmt, creditorAmt;
                    if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                        debtorAmt = +e.item.debtorAmt;
                        creditorAmt = +e.item.creditorAmt;
                        if (!isNaN(debtorAmt)) {
                            e.item.debtorTax = e.item.debtorAmt * 0.09;
                        }
                        if (!isNaN(creditorAmt)) {
                            e.item.creditorTax = e.item.creditorAmt * 0.09;
                        }
                    }
                });
                this.setState({
                    cv: cv,
                    transferSlip: transferSlip
                });
            });
        };
        this.onGotoPageClick = (command) => {
            let cv = this.state.cv;
            if (command === 'first') {
                cv.moveToFirstPage();
            }
            else if (command === 'previous') {
                cv.moveToPreviousPage();
            }
            else if (command === 'next') {
                cv.moveToNextPage();
            }
            else if (command === 'last') {
                cv.moveToLastPage();
            }
        };
        this.onExportXlsxClick = () => {
            let workbook = wjGridXlsx.FlexGridXlsxConverter.save(this.state.transferSlip);
            let workbookRow = new wjXlsx.WorkbookRow();
            let workbookFill = new wjXlsx.WorkbookFill();
            workbookFill.color = '#8080FF';
            let workbookFont = new wjXlsx.WorkbookFont();
            workbookFont.bold = true;
            let workbookStyle = new wjXlsx.WorkbookStyle();
            workbookStyle.fill = workbookFill;
            workbookStyle.font = workbookFont;
            workbookStyle.hAlign = wjXlsx.HAlign.Center;
            let workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = 'Date';
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = this.state.data.date;
            let dateCellStyle = new wjXlsx.WorkbookStyle();
            dateCellStyle.format = 'MM/dd/yyyy';
            workbookCell.style = dateCellStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = 'Slip No';
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = this.state.data.slipNo;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = 'Settlement';
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = this.state.data.settlement;
            workbookRow.cells.push(workbookCell);
            workbook.sheets[0].rows.splice(0, 0, workbookRow);
            workbook.sheets[0].frozenPane.rows = 3;
            workbookRow = new wjXlsx.WorkbookRow();
            workbookFill = new wjXlsx.WorkbookFill();
            workbookFill.color = '#99B4D1';
            workbookStyle = new wjXlsx.WorkbookStyle();
            workbookStyle.fill = workbookFill;
            workbookStyle.hAlign = wjXlsx.HAlign.Center;
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = 'Debtor Sum';
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = this.state.debtorSum;
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = 'Creditor Sum';
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = this.state.creditorSum;
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = 'Balance';
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbookCell = new wjXlsx.WorkbookCell();
            workbookCell.value = this.state.balance;
            workbookCell.style = workbookStyle;
            workbookRow.cells.push(workbookCell);
            workbook.sheets[0].rows.push(workbookRow);
            workbook.saveAsync('TransferSlip.xlsx');
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
                    wjPdf.saveBlob(args.blob, 'TransferSlip.pdf');
                }
            }), settings = {
                styles: {
                    cellStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#c6c6c6'
                    },
                    altCellStyle: {
                        backgroundColor: '#f9f9f9'
                    },
                    headerCellStyle: {
                        backgroundColor: '#eaeaea'
                    }
                }
            }, font, drawTextSetting, thinPen = new wjPdf.PdfPen('#000000', 0.5);
            // Draw header of the transfer slip.
            doc.paths
                .rect(0.5, 0.5, 50, 21)
                .fill('#8080FF')
                .moveTo(0, 0).lineTo(334, 0)
                .moveTo(334, 0).lineTo(334, 22)
                .moveTo(0, 22).lineTo(334, 22)
                .moveTo(0, 0).lineTo(0, 22).stroke(thinPen);
            doc.drawText('Date', 3.5, 5.5, drawTextSetting);
            doc.drawText(wjCore.Globalize.format(this.state.data.date, 'd'), 53.5, 5.5, drawTextSetting);
            doc.paths
                .rect(130.5, 0.5, 50, 21)
                .fill('#8080FF');
            doc.drawText('Slip No', 133.5, 5.5, drawTextSetting);
            doc.drawText(this.state.data.slipNo, 183.5, 5.5, drawTextSetting);
            doc.paths
                .rect(230.5, 0.5, 50, 21)
                .fill('#8080FF');
            doc.drawText('Settlement', 233.5, 5.5, drawTextSetting);
            doc.drawText(this.state.data.settlement, 283.5, 5.5, drawTextSetting);
            doc.moveDown();
            // Draw the body of the transfer slip.
            wjGridPdf.FlexGridPdfConverter.draw(this.state.transferSlip, doc, null, null, settings);
            // Draw the footer of the transfer slip.
            doc.paths
                .rect(0.5, 274.5, 380, 21)
                .fill('#99B4D1')
                .moveTo(0, 274).lineTo(381, 274)
                .moveTo(381, 274).lineTo(381, 296)
                .moveTo(0, 296).lineTo(381, 296)
                .moveTo(0, 274).lineTo(0, 296)
                .moveTo(60, 274).lineTo(60, 296)
                .moveTo(120, 274).lineTo(120, 296)
                .moveTo(180, 274).lineTo(180, 296)
                .moveTo(240, 274).lineTo(240, 296)
                .moveTo(320, 274).lineTo(320, 296).stroke(thinPen);
            doc.drawText('Debtor Sum', 3.5, 279.5, drawTextSetting);
            doc.drawText(this.state.debtorSum, 63.5, 279.5, drawTextSetting);
            doc.drawText('Creditor Sum', 123.5, 279.5, drawTextSetting);
            doc.drawText(this.state.creditorSum, 183.5, 279.5, drawTextSetting);
            doc.drawText('Balance', 243.5, 279.5, drawTextSetting);
            doc.drawText(this.state.balance, 323.5, 279.5, drawTextSetting);
            doc.end();
        };
        this._updateSummary = () => {
            let debtor = wjCore.getAggregate(wjCore.Aggregate.Sum, this.state.cv.items, 'debtorAmt'), creditor = wjCore.getAggregate(wjCore.Aggregate.Sum, this.state.cv.items, 'creditorAmt');
            this.setState({
                debtorSum: wjCore.Globalize.format(debtor, 'c'),
                creditorSum: wjCore.Globalize.format(creditor, 'c'),
                balance: wjCore.Globalize.format(debtor - creditor, 'c')
            });
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
        let data = generateSlipData(50);
        this.state = {
            data: data,
            items: new wjCore.CollectionView(data.items),
            layoutDefinition: generateLayoutDef(),
            minDate: new Date(data.date.getFullYear(), 0, 1),
            maxDate: new Date(data.date.getFullYear(), 11, 31),
            transferSlip: {
                rowHeaders: {}
            },
            cv: {},
            slipNo: '',
            settlement: '',
            debtorSum: '',
            creditorSum: '',
            balance: '',
            currentDescription: ''
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row show-grid">
                <div className="col-md-1 grid-title">Date</div>
                <div className="col-md-2">
                    <wjInput.InputDate format="d" value={this.state.data.date} min={this.state.minDate} max={this.state.maxDate}>
                    </wjInput.InputDate>
                </div>
                <div className="col-md-2 grid-title">Slip No
            </div>
                <div className="col-md-2">
                    <input value={this.state.slipNo} type="text" className="form-control"/>
                </div>
                <div className="col-md-2 grid-title">Settlement</div>
                <div className="col-md-2">
                    <input value={this.state.settlement} type="text" className="form-control"/>
                </div>
            </div>
            <wjGrid.MultiRow itemsSource={this.state.items} layoutDefinition={this.state.layoutDefinition} initialized={this.initSlip}></wjGrid.MultiRow>
            <div className="row show-grid">
                <div style={{ width: "125px" }} className="summary-cell">Debtor Sum</div>
                <div style={{ width: "125px" }} className="summary-cell">
                    <span dangerouslySetInnerHTML={{ __html: this.state.debtorSum }}></span>
                </div>
                <div style={{ width: "125px" }} className="summary-cell">Creditor Sum</div>
                <div style={{ width: "125px" }} className="summary-cell">
                    <span dangerouslySetInnerHTML={{ __html: this.state.creditorSum }}></span>
                </div>
                <div style={{ width: "110px" }} className="summary-cell">Balance</div>
                <div style={{ width: "100px" }} className="summary-cell">
                    <span dangerouslySetInnerHTML={{ __html: this.state.balance }}></span>
                </div>
            </div>
            <div className="pull-right btn-group">
                <button className="btn btn-default" onClick={e => this.onGotoPageClick('first')} id="first">
                    <span className="glyphicon glyphicon-fast-backward"></span>
                </button>
                <button className="btn btn-default" onClick={e => this.onGotoPageClick('previous')} id="previous">
                    <span className="glyphicon glyphicon-backward"></span>
                </button>
                <button id="current" type="button" className="btn" disabled style={{ width: "100px" }} dangerouslySetInnerHTML={{ __html: this.state.currentDescription }}>
                </button>
                <button className="btn btn-default" onClick={e => this.onGotoPageClick('next')} id="next">
                    <span className="glyphicon glyphicon-forward"></span>
                </button>
                <button className="btn btn-default" onClick={e => this.onGotoPageClick('last')} id="last">
                    <span className="glyphicon glyphicon-fast-forward"></span>
                </button>
            </div>
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
    componentDidMount() {
        let items = this.state.items;
        items.pageSize = 5;
        this.setState({
            items: items,
            slipNo: this.state.data.slipNo,
            settlement: this.state.data.settlement
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
