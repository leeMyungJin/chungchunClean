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
import * as pdf from '@grapecity/wijmo.pdf';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(10)
        };
    }
    render() {
        return <div className="container-fluid">
            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="Column" selectionMode="ListBox" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Start Date" binding="start" format="d"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="End Date" binding="end" format="d"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(ctl) {
        this.flexGrid = ctl;
    }
    exportPDF() {
        let doc = new pdf.PdfDocument({
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
            ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
        });
        //
        let settings = {
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
        };
        //
        doc.drawText('This grid is scaled to fit the width of 200 and drawn using the draw method.', null, null, { width: 200 });
        doc.moveDown();
        gridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, 200, null, settings);
        //
        doc.drawText('This grid is drawn in its original size using the drawToPosition method.', 220, 0);
        doc.moveDown();
        gridPdf.FlexGridPdfConverter.drawToPosition(this.flexGrid, doc, new wjcCore.Point(220, doc.y), null, null, settings);
        //
        doc.drawText('This grid is drawn in its original size using the draw method and is split into multiple pages.', 0, 400);
        doc.moveDown();
        gridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, null, null, settings);
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
