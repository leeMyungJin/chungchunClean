import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import * as wjcGrid from '@grapecity/wijmo.react.grid';
import * as wjcGauge from '@grapecity/wijmo.react.gauge';
import { getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._data = getData(3000);
        //
        this.state = { progress: 0 };
    }
    //
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid className="grid" autoGenerateColumns={false} itemsSource={this._data} initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Pending" binding="amount2" format="c2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn header="Active" binding="active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>

            <div className="row">
                <div className="col-md-6 col-xs-12 well well-sm">
                    <wjcGauge.LinearGauge isReadOnly={true} min={0} max={100} value={this.state.progress} showText={"Value"}>
                    </wjcGauge.LinearGauge>

                    <button className="btn btn-default" onClick={this.export.bind(this)}>Export</button>
                    <button className="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
                </div>
            </div>
        </div>;
    }
    //
    initializeGrid(source) {
        this._flexGrid = source;
    }
    //
    export() {
        this.cancel();
        //
        this._worker = this.loadWorker('./export-grid.js', () => {
            gridPdf.PdfWebWorkerClient.exportGrid(this._worker, this._flexGrid, 'FlexGrid.pdf', {
                scaleMode: gridPdf.ScaleMode.PageWidth,
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
            }, null, progress => this.setState({ progress: progress * 100 }));
        });
    }
    //
    cancel() {
        if (this._worker) {
            this._worker.terminate();
        }
        this.setState({ progress: 0 });
    }
    //
    // Creates a web worker that executes a module from the specified URL.
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
    componentWillUnmount() {
        if (this._worker) {
            this._worker.terminate();
        }
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
