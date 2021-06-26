import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as gridPdf from "@grapecity/wijmo.grid.pdf";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(10),
            showErrors: true
        };
    }
    render() {
        return <div className="container-fluid">
            
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            FlexGrid Settings
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div className="form-check">
                            <label className="form-check-label">
                                Show Errors
                                <input id="cbShowErrors" type="checkbox" checked={this.state.showErrors} onChange={this.showErrorChanged.bind(this)}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>

            
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} selectionMode="ListBox" headersVisibility="All" showErrors={this.state.showErrors} itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(ctl) {
        this.flexGrid = ctl;
    }
    showErrorChanged() {
        this.setState({
            showErrors: !this.state.showErrors
        });
    }
    exportPDF() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
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
                },
                errorCellStyle: {
                    backgroundColor: 'rgba(255, 0, 0, 0.3)'
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
