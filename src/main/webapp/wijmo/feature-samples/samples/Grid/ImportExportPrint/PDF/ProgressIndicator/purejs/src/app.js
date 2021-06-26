import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './style.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjGauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData(3000);
    //
    let grid = new wjGrid.FlexGrid('#flexgrid', {
        autoGenerateColumns: false,
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID' },
            { binding: 'country', header: 'Country' },
            { binding: 'product', header: 'Product' },
            { binding: 'amount', header: 'Amount', format: 'c' },
            { binding: 'amount2', header: 'Pending', format: 'c' },
            { binding: 'discount', header: 'Discount', format: 'p1' },
            { binding: 'active', header: 'Active', width: 185 }
        ]
    });
    //
    let progressBar = new wjGauge.LinearGauge('#progressBar', {
        isReadOnly: true,
        min: 0,
        max: 100,
        value: 0,
        showText: 'Value'
    }), worker;
    //
    document.querySelector('#export').addEventListener('click', () => {
        cancel();
        //
        worker = loadWorker('./export-grid', () => {
            wjGridPdf.PdfWebWorkerClient.exportGrid(worker, grid, 'FlexGrid.pdf', {
                scaleMode: wjGridPdf.ScaleMode.PageWidth,
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
            }, null, progress => progressBar.value = progress * 100);
        });
    });
    //
    document.querySelector('#cancel').addEventListener('click', () => cancel());
    //
    function cancel() {
        if (worker)
            worker.terminate();
        worker = null;
        progressBar.value = 0;
    }
    //
    // Creates a web worker that executes a module from the specified URL.
    function loadWorker(url, ready) {
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
    window.addEventListener('unload', () => {
        if (worker) {
            worker.terminate();
        }
    });
}
