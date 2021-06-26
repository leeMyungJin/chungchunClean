import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
import * as gridPdf from "@grapecity/wijmo.grid.pdf";
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
            
            <button className="btn btn-default" onClick={this.export1.bind(this)}>Export (customCellContent = false)</button>
            <button className="btn btn-default" onClick={this.export2.bind(this)}>Export (customCellContent = true)</button>
            <button className="btn btn-default" onClick={this.export3.bind(this)}>Export (customCellContent = false + formatItem
                callback)</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="All" selectionMode="ListBox" itemsSource={this.state.data} formatItem={this.formatItem.bind(this)} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country" width="*" isReadOnly={true}></wjcGrid.FlexGridColumn>
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
            e.cell.appendChild(document.createTextNode(`${data['country']}-${data['capital']}`));
        }
    }
    export1() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            customCellContent: false
        });
    }
    export2() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            customCellContent: true
        });
    }
    export3() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            customCellContent: false,
            formatItem: this.formatCountryCell
        });
    }
    formatCountryCell(args) {
        // if this is a regular grid cell...
        if (args.panel.cellType === wjGrid.CellType.Cell) {
            // ... that belongs to the 'country' column
            if (args.panel.columns[args.col].binding === 'country') {
                let 
                // get cell with custom content produced by a cell template or grid.formatItem handler
                cell = args.getFormattedCell(), 
                // bound rectangle of cell's content area
                contentRect = args.contentRect, 
                // construct flag image url based on country name passed in args.data 
                image = args.canvas.openImage(`resources/${args.data}.png`), imageTop = contentRect.top + (contentRect.height - image.height) / 2;
                // draw flag image
                args.canvas.drawImage(image, contentRect.left, imageTop);
                // Draw custom cell text retrieved using the cell.textContent property,
                // right to the image and in the args.textTop vertical position. The latter
                // works because we draw text using default cell font.
                args.canvas.drawText(cell.textContent.trim(), contentRect.left + image.width + 3, args.textTop);
                // cancel standard cell content drawing
                args.cancel = true;
            }
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
