import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as gridPdf from "@grapecity/wijmo.grid.pdf";
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartModule from '@grapecity/wijmo.react.chart';
import * as pdf from '@grapecity/wijmo.pdf';
import { getEmployee } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.employee = getEmployee();
        this.state = {
            employee: this.employee,
            totals: ((totals) => [
                { name: 'Hotel', value: totals.hotel },
                { name: 'Transport', value: totals.transport },
                { name: 'Meal', value: totals.meal },
                { name: 'Fuel', value: totals.fuel },
                { name: 'Misc', value: totals.misc }
            ])(this.employee.expenses.totals)
        };
    }
    render() {
        return <div className="container-fluid">
            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="Column" allowMerging="All" itemsSource={this.state.employee.expenses.items} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="Date" binding="date" format="d" minWidth={80}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Hotel" binding="hotel" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Transport" binding="transport" format="c" minWidth={80}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Meal" binding="meal" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Fuel" binding="fuel" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Misc" binding="misc" format="c"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
            
            <div className="col-xs-6">
                <wjChartModule.FlexPie binding="value" bindingName="name" innerRadius={0.75} initialized={this.initializePie.bind(this)} itemsSource={this.state.totals}>
                </wjChartModule.FlexPie>
            </div>
        </div>;
    }
    initializeGrid(ctl) {
        this.flexGrid = ctl;
    }
    initializePie(ctl) {
        this.flexPie = ctl;
    }
    exportPDF() {
        let doc = new pdf.PdfDocument({
            header: {
                declarative: {
                    text: 'Expense Analysis Report',
                    font: new pdf.PdfFont('times', 12),
                    brush: '#bfc1c2'
                }
            },
            lineGap: 2,
            pageSettings: {
                margins: {
                    left: 36,
                    right: 36,
                    top: 36,
                    bottom: 36
                }
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
        });
        //
        this.drawEmployee(doc, this.flexGrid, this.flexPie, this.employee, () => doc.end());
    }
    drawEmployee(doc, flexGrid, flexPie, employee, done) {
        let expenses = employee.expenses.items.sort((a, b) => a.date.getTime() - b.date.getTime()), minDate = expenses[0].date, maxDate = expenses[expenses.length - 1].date, bold = new pdf.PdfFont('times', 10, 'normal', 'bold');
        //
        doc.moveDown(2);
        //
        doc.drawText('Name: ', undefined, undefined, { font: bold, continued: true });
        doc.drawText(employee.name);
        //
        doc.drawText('From: ', undefined, undefined, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(minDate, wjcCore.DataType.String, 'd'));
        //
        doc.drawText('To: ', undefined, undefined, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(maxDate, wjcCore.DataType.String, 'd'));
        //
        doc.moveDown(2);
        let y = doc.y;
        //
        doc.drawText('Expense details:', 0, y);
        doc.drawText('Total expenses by category:', doc.width * 0.5 + 20, y);
        y = doc.y;
        //
        gridPdf.FlexGridPdfConverter.draw(flexGrid, doc, doc.width * 0.5, null, {
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    font: { weight: 'bold' },
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        });
        //
        flexPie.saveImageToDataUrl(wjChart.ImageFormat.Png, (url) => {
            doc.drawImage(url, doc.width * 0.5 + 20, y, { width: doc.width * 0.5 - 20 });
            done();
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
