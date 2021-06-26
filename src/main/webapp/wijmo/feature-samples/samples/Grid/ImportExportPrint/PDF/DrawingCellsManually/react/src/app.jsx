import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as gridPdf from "@grapecity/wijmo.grid.pdf";
import * as grid from '@grapecity/wijmo.grid';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(5)
        };
    }
    render() {
        return <div className="container-fluid">
            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="All" selectionMode="ListBox" itemsSource={this.state.data} formatItem={this.formatItem.bind(this)} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country" isReadOnly={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Color" binding="color"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>

        </div>;
    }
    initializeGrid(ctl) {
        this.flexGrid = ctl;
    }
    formatItem(sender, e) {
        if (e.panel === sender.cells && sender.columns[e.col].binding === 'country') {
            let data = (e.panel.rows[e.row]).dataItem;
            //
            e.cell.textContent = '';
            //
            // add flag image
            let image = document.createElement('img');
            image.src = `resources/${data['country']}.png`;
            e.cell.appendChild(image);
            //
            // add non-breaking space
            e.cell.appendChild(document.createTextNode('\u00A0'));
            //
            // add text
            e.cell.appendChild(document.createTextNode(`${data['country']}`));
        }
    }
    exportPDF() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            documentOptions: {
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
            customCellContent: true,
            formatItem: (args) => {
                if (args.panel.cellType === grid.CellType.Cell) {
                    if (args.panel.columns[args.col].binding === 'country') {
                        let r = args.contentRect, sz = args.canvas.measureText(args.data, args.style.font, {
                            height: r.height,
                            width: r.width
                        }), image = args.canvas.openImage(`resources/${args.data}.png`), imageTop = r.top + (r.height - image.height) / 2, textTop = r.top + (r.height - sz.size.height) / 2;
                        //
                        // draw flag image
                        args.canvas.drawImage(image, r.left, imageTop);
                        //
                        // draw text
                        args.canvas.drawText(args.data, r.left + image.width + 3, textTop, {
                            brush: args.style.color,
                            font: args.style.font,
                            height: r.height,
                            width: r.width
                        });
                        //
                        // cancel standard cell content drawing
                        args.cancel = true;
                    }
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
