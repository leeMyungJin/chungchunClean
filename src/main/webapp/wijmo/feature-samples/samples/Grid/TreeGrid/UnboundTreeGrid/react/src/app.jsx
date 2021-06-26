import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
import { getWorkers } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getWorkers(),
            rowCountText: ''
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid headersVisibility="Column" selectionMode="Row" beginningEdit={this.onBeginningEdit.bind(this)} initialized={this.initialGrid.bind(this)}>
            </wjcGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        let workers = getWorkers();
        // add columns
        this.workersGrid.columns.push(new wjGrid.Column({ header: 'Name' }));
        this.workersGrid.columns.push(new wjGrid.Column({ header: 'Hours', dataType: 'Number', format: 'n2' }));
        this.workersGrid.columns.push(new wjGrid.Column({ header: 'Rate', dataType: 'Number', format: 'n2' }));
        // add rows
        for (let w = 0; w < workers.length; w++) {
            // add worker
            let worker = workers[w];
            let row = new wjGrid.GroupRow();
            row.dataItem = worker;
            row.isReadOnly = false;
            row.level = 0;
            this.workersGrid.rows.push(row);
            this.workersGrid.setCellData(row.index, 0, worker.name);
            for (let c = 0; c < worker.checks.length; c++) {
                // add check
                let check = worker.checks[c];
                row = new wjGrid.GroupRow();
                row.dataItem = check;
                row.isReadOnly = false;
                row.level = 1;
                this.workersGrid.rows.push(row);
                this.workersGrid.setCellData(row.index, 0, check.name);
                for (let e = 0; e < check.earnings.length; e++) {
                    // add earning
                    let earning = check.earnings[e];
                    row = new wjGrid.GroupRow();
                    row.dataItem = earning;
                    row.isReadOnly = false;
                    row.level = 2;
                    this.workersGrid.rows.push(row);
                    this.workersGrid.setCellData(row.index, 0, earning.name);
                    this.workersGrid.setCellData(row.index, 1, earning.hours);
                    this.workersGrid.setCellData(row.index, 2, earning.rate);
                }
            }
        }
    }
    initialGrid(grid) {
        this.workersGrid = grid;
    }
    onBeginningEdit(flexGird, e) {
        let value = e.panel.getCellData(e.row, e.col, true);
        if (value == null) {
            e.cancel = true; // can't edit!
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
