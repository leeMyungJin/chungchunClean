import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { generateLayoutDef, getOrderDetail } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialized = (orderDetail) => {
            this.setState({ orderDetail: orderDetail });
        };
        this.onExportXlsxClick = () => {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.state.orderDetail, null, "OrderDetail.xlsx");
        };
        this.onExportPdfClick = () => {
            let doc = new wjPdf.PdfDocument({
                header: {
                    declarative: {
                        text: "\t&[Page]\\&[Pages]"
                    }
                },
                footer: {
                    declarative: {
                        text: "\t&[Page]\\&[Pages]"
                    }
                },
                ended: function (sender, args) {
                    wjPdf.saveBlob(args.blob, "OrderDetail.pdf");
                }
            }), settings = {
                styles: {
                    cellStyle: {
                        backgroundColor: "#ffffff",
                        borderColor: "#c6c6c6"
                    },
                    altCellStyle: {
                        backgroundColor: "#C0FFC0"
                    },
                    headerCellStyle: {
                        backgroundColor: "#eaeaea"
                    }
                }
            };
            wjGridPdf.FlexGridPdfConverter.draw(this.state.orderDetail, doc, null, null, settings);
            doc.end();
        };
        this.state = {
            data: getOrderDetail(5),
            layoutDefinition: generateLayoutDef(),
            orderDetail: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow id="orderDetail" itemsSource={this.state.data} layoutDefinition={this.state.layoutDefinition} initialized={this.initialized}></wjGrid.MultiRow>
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
