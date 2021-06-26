import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { MultiRow } from '@grapecity/wijmo.react.grid.multirow';
import { TransposedMultiRow } from '@grapecity/wijmo.react.grid.transposedmultirow';
import { getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        //
        this.exportToExcel = () => {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.trnMultirow, {
                includeRowHeaders: true
            }, 'FlexGrid.xlsx');
        };
        //
        this.exportToPdf = () => {
            wjGridPdf.FlexGridPdfConverter.export(this.trnMultirow, 'FlexGrid.pdf', {
                documentOptions: {
                    pageSettings: {
                        layout: wjPdf.PdfPageOrientation.Landscape
                    }
                },
                scaleMode: wjGridPdf.ScaleMode.ActualSize
            });
        };
        let appData = getData();
        let orders = appData.orders;
        let layoutDefs = appData.layoutDefs;
        let currentLayout = appData.layoutDefs.currentItem;
        this.state = {
            orders,
            layoutDefs,
            currentLayout
        };
        layoutDefs.currentChanged.addHandler(() => {
            this.setState({
                currentLayout: layoutDefs.currentItem
            });
        });
    }
    //
    render() {
        return <div className="container-fluid">
            <label>
                Layout option:
                <wjInput.ComboBox itemsSource={this.state.layoutDefs} displayMemberPath="name">
                </wjInput.ComboBox>
            </label>
            <p>{this.state.currentLayout.descriptions.main}</p>
            <label>Transposed MultiRow</label>
            <p>{this.state.currentLayout.descriptions.transposedView}</p>
            <TransposedMultiRow itemsSource={this.state.orders} layoutDefinition={this.state.currentLayout.def} initialized={this.initializeGrid.bind(this)}>
            </TransposedMultiRow>
            <div>
            <button onClick={this.exportToExcel} className="btn btn-default">
                Export To Excel
            </button>
            <button onClick={this.exportToPdf} className="btn btn-default">
                Export To PDF
            </button>
        </div>
            <label>Ordinary MultiRow</label>
            <p>{this.state.currentLayout.descriptions.ordinaryView}</p>
            <MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.currentLayout.def}></MultiRow>
        </div>;
    }
    //
    initializeGrid(trnMultirow) {
        this.trnMultirow = trnMultirow;
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
