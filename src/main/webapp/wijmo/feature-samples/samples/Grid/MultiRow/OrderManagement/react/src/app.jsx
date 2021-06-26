import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjMultiRow from '@grapecity/wijmo.react.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { generateLayoutDef, getOrders } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialized = (orderManagement) => {
            this.setState({
                orderManagement: orderManagement,
                cv: orderManagement.collectionView
            }, () => {
                this.currentPageChanged();
                let cv = this.state.cv;
                cv.pageChanged.addHandler(() => {
                    this.currentPageChanged();
                });
                cv.collectionChanged.addHandler((sender, e) => {
                    let unitPrice, quantity;
                    if (e.action === wjCore.NotifyCollectionChangedAction.Change &&
                        !!e.item) {
                        unitPrice = +e.item.unitPrice;
                        quantity = +e.item.quantity;
                        if (!isNaN(unitPrice) && !isNaN(quantity)) {
                            e.item.amount = unitPrice * quantity;
                        }
                    }
                });
                this.setState({ cv: cv });
            });
        };
        this.currentPageChanged = () => {
            let cv = this.state.cv;
            let curr = wjCore.format("{current:n0} / {count:n0}", {
                current: cv.pageIndex + 1,
                count: cv.pageCount
            });
            this.setState({ currentDescription: curr }, () => {
                if (cv.pageIndex === 0) {
                    document
                        .querySelector("#first")
                        .setAttribute("disabled", "true");
                    document
                        .querySelector("#previous")
                        .setAttribute("disabled", "true");
                }
                else {
                    document.querySelector("#first").removeAttribute("disabled");
                    document.querySelector("#previous").removeAttribute("disabled");
                }
                if (cv.pageIndex === cv.pageCount - 1) {
                    document
                        .querySelector("#last")
                        .setAttribute("disabled", "true");
                    document
                        .querySelector("#next")
                        .setAttribute("disabled", "true");
                }
                else {
                    document.querySelector("#last").removeAttribute("disabled");
                    document.querySelector("#next").removeAttribute("disabled");
                }
            });
        };
        this.onExportXlsxClick = () => {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.state.orderManagement, null, "OrderManagemenr.xlsx");
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
                    wjPdf.saveBlob(args.blob, "OrderManagemenr.pdf");
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
            wjGridPdf.FlexGridPdfConverter.draw(this.state.orderManagement, doc, null, null, settings);
            doc.end();
        };
        this.state = {
            items: new wjCore.CollectionView(getOrders(20)),
            layoutDefinition: generateLayoutDef(),
            currentDescription: null,
            cv: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjMultiRow.MultiRow itemsSource={this.state.items} layoutDefinition={this.state.layoutDefinition} initialized={this.initialized}></wjMultiRow.MultiRow>
            <div className="pull-right btn-group">
                <button className="btn btn-default" onClick={(e) => this.onGotoPageClick('first')} id="first">
                    <span className="glyphicon glyphicon-fast-backward"></span>
                </button>
                <button className="btn btn-default" onClick={(e) => this.onGotoPageClick('previous')} id="previous">
                    <span className="glyphicon glyphicon-backward"></span>
                </button>
                <button id="current" type="button" className="btn" disabled style={{ width: "100px" }} dangerouslySetInnerHTML={{ __html: this.state.currentDescription }}></button>
                <button className="btn btn-default" onClick={(e) => this.onGotoPageClick('next')} id="next">
                    <span className="glyphicon glyphicon-forward"></span>
                </button>
                <button className="btn btn-default" onClick={(e) => this.onGotoPageClick('last')} id="last">
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
    onGotoPageClick(command) {
        let cv = this.state.cv;
        if (command === "first") {
            cv.moveToFirstPage();
        }
        else if (command === "previous") {
            cv.moveToPreviousPage();
        }
        else if (command === "next") {
            cv.moveToNextPage();
        }
        else if (command === "last") {
            cv.moveToLastPage();
        }
    }
    componentWillMount() {
        let items = this.state.items;
        items.pageSize = 5;
        this.setState({ items: items });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
