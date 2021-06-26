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
            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} selectionMode="ListBox" headersVisibility="All" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Color" binding="color" isReadOnly={true}></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(ctl) {
        this.flexGrid = ctl;
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
            },
            formatItem: (args) => {
                if (args.panel.cellType === wjGrid.CellType.RowHeader) {
                    args.data = (args.row + 1).toString();
                }
                else {
                    if (args.panel.cellType === wjGrid.CellType.Cell && args.panel.columns[args.col].binding === 'color') {
                        args.style.backgroundColor = args.data;
                    }
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
