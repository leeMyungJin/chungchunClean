import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <button className="btn btn-default" onClick={this.printDoc.bind(this)}>
                Print with PrintDocument
            </button>
            <wjcGrid.FlexGrid itemsSource={this.state.data} initialized={this.initialized.bind(this)}/>
        </div>;
    }
    initialized(flex) {
        this.flex = flex;
    }
    printDoc() {
        // create PrintDocument
        let doc = new wjcCore.PrintDocument({
            title: "PrintDocument Test",
            copyCss: false // prevent cross-origin issues in jsfiddle
        });
        // add CSS explicitly (since we can't use copyCss in jsfiddle)
        doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
        doc.append('<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">');
        // add some simple text
        doc.append("<h1>Printing Example</h1>");
        doc.append("<p>This document was created using the <b>PrintDocument</b> class.</p>");
        // add a printer-friendly version of a FlexGrid to the document
        doc.append("<p>Here's a FlexGrid rendered as a table:</p>");
        let tbl = this.renderTable();
        doc.append(tbl);
        // print the document
        doc.print();
    }
    // renders grid as a table
    renderTable() {
        // start table
        let tbl = "<table>";
        // headers
        if (this.flex.headersVisibility & wjGrid.HeadersVisibility.Column) {
            tbl += "<thead>";
            for (let r = 0; r < this.flex.columnHeaders.rows.length; r++) {
                tbl += this.renderRow(this.flex.columnHeaders, r);
            }
            tbl += "</thead>";
        }
        // body
        tbl += "<tbody>";
        for (let r = 0; r < this.flex.rows.length; r++) {
            tbl += this.renderRow(this.flex.cells, r);
        }
        tbl += "</tbody>";
        // done
        tbl += "</table>";
        return tbl;
    }
    renderRow(panel, r) {
        let tr = "", row = panel.rows[r];
        if (row.renderSize > 0) {
            tr += "<tr>";
            for (let c = 0; c < panel.columns.length; c++) {
                let col = panel.columns[c];
                if (col.renderSize > 0) {
                    // get cell style, content
                    let style = "width:" +
                        col.renderSize +
                        "px;" +
                        "text-align:" +
                        col.getAlignment() +
                        ";" +
                        "padding-right: 6px";
                    let content = panel.getCellData(r, c, true);
                    if (!row.isContentHtml && !col.isContentHtml) {
                        content = wjcCore.escapeHtml(content);
                    }
                    // add cell to row
                    if (panel.cellType == wjGrid.CellType.ColumnHeader) {
                        tr +=
                            '<th style="' +
                                style +
                                '">' +
                                content +
                                "</th>";
                    }
                    else {
                        // show boolean values as checkboxes
                        let raw = panel.getCellData(r, c, false);
                        if (raw === true) {
                            content = "&#9745;";
                        }
                        else if (raw === false) {
                            content = "&#9744;";
                        }
                        tr +=
                            '<td style="' +
                                style +
                                '">' +
                                content +
                                "</td>";
                    }
                }
            }
            tr += "</tr>";
        }
        return tr;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
