import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
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
                <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(ctl) {
        this.flexGrid = ctl;
    }
    exportPDF() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
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
            embeddedFonts: [
                {
                    source: 'resources/fira/FiraSans-Regular.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'normal',
                    sansSerif: true
                },
                {
                    source: 'resources/fira/FiraSans-Bold.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'bold',
                    sansSerif: true
                }
            ],
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6',
                    font: {
                        family: 'fira'
                    }
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
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
