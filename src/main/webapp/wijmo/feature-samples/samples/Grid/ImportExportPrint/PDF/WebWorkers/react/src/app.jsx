import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chart from '@grapecity/wijmo.chart';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import '@grapecity/wijmo.chart.render';
//
import * as wjcGrid from '@grapecity/wijmo.react.grid';
import * as WjChartModule from '@grapecity/wijmo.react.chart';
import { getExpenses, getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        //
        this._docName = 'FlexGrid.pdf';
        this._data = getData(1500);
        this._totals = ((totals) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.Misc }
        ])(getExpenses().totals);
        //
        this._gridExportSettings = {
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
        this.state = {
            ctx1: {
                exporting: false,
                progress: 0,
                preparing: false,
                worker: null
            },
            ctx2: {
                exporting: false,
                progress: 0,
                preparing: false,
                worker: null
            },
            ctx3: {
                exporting: false,
                progress: 0,
                preparing: false,
                worker: null
            }
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <p>
                This sample demonstrates the "Simple single grid export" scenario and shows how to export FlexGrid in
                a background thread.
            </p>

            <button className="btn btn-default" disabled={this.state.ctx1.preparing} onClick={this.export1.bind(this, this.state.ctx1)}>{this.state.ctx1.exporting ? 'Cancel' : 'Export'}</button>&nbsp;

            <span>{(this.state.ctx1.progress * 100).toFixed(1) + "%"}</span>
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="Column" allowMerging="All" itemsSource={this._data} isDisabled={this.state.ctx1.preparing} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Start Date" binding="start" format="d"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="End Date" binding="end" format="d"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Color" binding="color"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Pending" binding="amount2" format="c2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
            <hr />

            <p>
                This sample demonstrates the "Custom document generation" scenario and shows how to export FlexPie
                (as a SVG image), FlexGrid and PNG image to a PDF in a background thread.
            </p>
            <p>
                The <a href="https://www.npmjs.com/package/xmldom">xmldom</a> library is used here to bring DOM
                support to the server to be able to draw SVG.
            </p>

            <button className="btn btn-default" disabled={this.state.ctx2.preparing} onClick={this.export2.bind(this, this.state.ctx2)}>{this.state.ctx2.exporting ? 'Cancel' : 'Export'}</button>&nbsp;

            <span>{(this.state.ctx2.progress * 100).toFixed(1) + "%"}</span>
            <p></p>
            <div className="row">
                <div className="col-md-6">
                    <WjChartModule.FlexPie itemsSource={this._totals} binding="value" bindingName="name" innerRadius={0.75} initialized={this.initializePie.bind(this)}>
                        <WjChartModule.FlexPieDataLabel content="{value:c1}" position="Inside"></WjChartModule.FlexPieDataLabel>
                    </WjChartModule.FlexPie>
                </div>
                <div className="col-md-6">
                    <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="Column" allowMerging="All" itemsSource={this._data} isDisabled={this.state.ctx2.preparing} initialized={this.initializeGrid2.bind(this)}>
                        <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Start Date" binding="start" format="d"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="End Date" binding="end" format="d"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Color" binding="color"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Pending" binding="amount2" format="c2"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1"></wjcGrid.FlexGridColumn>
                        <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
                    </wjcGrid.FlexGrid>
                </div>
            </div>
            <hr />

            <p>
                This sample demonstrates the "Low-level usage of Web Workers API" scenario and shows how to export
                FlexGrid to a PDF in a background thread using Web Workers API.
            </p>
            <button className="btn btn-default" disabled={this.state.ctx3.preparing} onClick={this.export3.bind(this, this.state.ctx3)}>{this.state.ctx3.exporting ? 'Cancel' :
            'Export'}</button>&nbsp;
            <span>{(this.state.ctx3.progress * 100).toFixed(1) + "%"}</span>
            <p></p>
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} headersVisibility="Column" allowMerging="All" itemsSource={this._data} isDisabled={this.state.ctx3.preparing} initialized={this.initializeGrid3.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Start Date" binding="start" format="d"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="End Date" binding="end" format="d"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Color" binding="color"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Pending" binding="amount2" format="c2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    //
    initializeGrid(source) {
        this._grid1 = source;
    }
    //
    initializeGrid2(source) {
        this._grid2 = source;
    }
    //
    initializeGrid3(source) {
        this._grid3 = source;
    }
    //
    initializePie(source) {
        this._pie = source;
    }
    //
    export1(ctx) {
        if (!ctx.exporting) {
            this.start(ctx, './export-grid.js', () => {
                gridPdf.PdfWebWorkerClient.exportGrid(ctx.worker, this._grid1, this._docName, this._gridExportSettings, null, (progress) => {
                    this.progress(ctx, progress);
                });
            });
        }
        else {
            this.cancel(ctx);
        }
    }
    //
    export2(ctx) {
        if (!ctx.exporting) {
            this.start(ctx, './export.js', () => {
                gridPdf.PdfWebWorkerClient.addString(ctx.worker, 'Title', 'title');
                gridPdf.PdfWebWorkerClient.addImage(ctx.worker, 'resources/canada.png', 'flag', null);
                this._pie.saveImageToDataUrl(chart.ImageFormat.Svg, (url) => {
                    gridPdf.PdfWebWorkerClient.addImage(ctx.worker, url, 'chart', null);
                });
                gridPdf.PdfWebWorkerClient.addGrid(ctx.worker, this._grid2, 'grid', this._gridExportSettings);
                gridPdf.PdfWebWorkerClient.export(ctx.worker, null, (data) => pdf.saveBlob(data.blob, this._docName), (progress) => this.progress(ctx, progress));
            });
        }
        else {
            this.cancel(ctx);
        }
    }
    //
    export3(ctx) {
        if (!ctx.exporting) {
            this.start(ctx, './api.js', () => {
                ctx.worker.addEventListener('message', e => {
                    if (e.data.type === 'progress') {
                        this.progress(ctx, e.data.value);
                    }
                    else {
                        pdf.saveBlob(new Blob([new Uint8Array(e.data.data)], { type: 'application/pdf' }), this._docName);
                    }
                });
                let gridData = gridPdf.PdfWebWorkerClient.serializeGrid(this._grid3, this._gridExportSettings);
                // Send gridData as a tranferable object
                ctx.worker.postMessage({ grid: gridData, settings: JSON.stringify(this._gridExportSettings) }, [gridData]);
            });
        }
        else {
            this.cancel(ctx);
        }
    }
    //
    /**
    * Creates web worker that executes the module from the specified URL.
    * @param url The module URL, relative to the src/workers directory.
    * @param ready
    */
    loadWorker(url, ready) {
        let worker = new Worker('src/workers/worker-loader.js');
        //
        worker.addEventListener('message', (e) => {
            if (e.data === '#ready#') {
                ready();
            }
        });
        //
        worker.postMessage({ url: url });
        //
        return worker;
    }
    //
    start(ctx, url, ready) {
        this.setState((state) => {
            ctx.preparing = true;
            ctx.progress = 0;
            ctx.worker = this.loadWorker(url, () => ready());
            return state;
        });
    }
    //
    progress(ctx, progress) {
        if (progress === 0 || progress === 1) {
            this.setState((state) => {
                ctx.preparing = false;
                ctx.exporting = progress === 0;
                ctx.progress = progress;
                return state;
            });
        }
        else {
            this.setState((state) => {
                ctx.progress = progress;
                return state;
            });
        }
    }
    //
    cancel(ctx) {
        this.setState((state) => {
            ctx.worker.terminate();
            ctx.exporting = false;
            ctx.progress = 0;
            ctx.worker = null;
            return state;
        });
    }
    //
    componentWillUnmount() {
        if (this.state.ctx1.worker) {
            this.state.ctx1.worker.terminate();
            this.state.ctx1.worker = null;
        }
        if (this.state.ctx2.worker) {
            this.state.ctx2.worker.terminate();
            this.state.ctx2.worker = null;
        }
        if (this.state.ctx3.worker) {
            this.state.ctx3.worker.terminate();
            this.state.ctx3.worker = null;
        }
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
