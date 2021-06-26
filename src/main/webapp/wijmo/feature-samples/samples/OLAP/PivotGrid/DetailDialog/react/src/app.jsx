import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ngFmt: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(10000),
                showColumnTotals: 'GrandTotals',
                showRowTotals: 'None',
                fields: [
                    { binding: 'product', header: 'Product' },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                    { binding: 'sales', header: 'Sales', format: 'n0' },
                    { binding: 'sales', header: 'Diff', format: 'p0', showAs: 'DiffRowPct' }
                ],
                rowFields: ['Date'],
                columnFields: ['Product'],
                valueFields: ['Sales', 'Diff']
            }),
            customDetails: true
        };
        this.customDetailsRef = React.createRef();
    }
    render() {
        return (<div className="container-fluid">
                <p>
                    <button id="showDetail" className="btn btn-primary" onClick={this.onShowDetailClick.bind(this)}>
                        Show Detail Dialog
                    </button>
                </p>
                <p>
                    The grid exposes the detail dialog through its
                    <b>detailDialog</b> property, which can be used to customize
                    the dialog as shown in this example.
                </p>
                <p>
                    <label>
                        Custom Detail Dialog
                        <input id="customDetails" ref={this.customDetailsRef} type="checkbox" checked={this.state.customDetails} onChange={this.customDetailsChange.bind(this)}/>
                    </label>
                </p>
                <Olap.PivotGrid itemsSource={this.state.ngFmt} isReadOnly={true} initialized={this.initializePivotGrid.bind(this)} formatItem={this.formatItem.bind(this)}></Olap.PivotGrid>
            </div>);
    }
    initializePivotGrid(pivotGrid) {
        this.pivotGrid = pivotGrid;
        const detailGridHost = this.pivotGrid.detailDialog.hostElement.querySelector('.wj-flexgrid');
        const detailGrid = wjcCore.Control.getControl(detailGridHost);
        pivotGrid.detailDialog.showing.addHandler((s) => {
            if (this.customDetailsRef.current.checked) {
                //
                // customize summary info above the grid
                // the default format is this:
                // Row: <b>{rowHeader}</b></br>
                // Column: <b>{columnHeader}</b><br>
                // {cellHeader}: <b>{cellValue}</b>
                const summary = s.hostElement.querySelector('.wj-summary'), fmt = 'Details for <b>{columnHeader}</b> on ' +
                    '<b>{rowHeader}</b>: <b>{cellHeader}</b> is ' +
                    '<b>{cellValue}</b>';
                summary.innerHTML = wjcCore.format(fmt, s);
                //
                // sort detail grid by date
                const sds = detailGrid.collectionView.sortDescriptions;
                sds.clear();
                sds.push(new wjcCore.SortDescription('date', false));
            }
        });
        // format cells in the detail grid
        detailGrid.formatItem.addHandler((s, e) => {
            if (e.panel == s.cells && this.customDetailsRef.current.checked) {
                let large = false, small = false, val = s.getCellData(e.row, e.col, false);
                switch (s.columns[e.col].binding) {
                    case 'sales':
                        large = val > 18;
                        small = val < 16;
                        break;
                    case 'downloads':
                        large = val > 80;
                        small = val < 60;
                        break;
                }
                wjcCore.toggleClass(e.cell, 'large-value', large);
                wjcCore.toggleClass(e.cell, 'small-value', small);
            }
        });
    }
    formatItem(s, e) {
        // we are interested in the cells panel
        if (e.panel == this.pivotGrid.cells) {
            // remove color by default
            let color = '';
            // format diff columns if custom formatting is on
            if (e.col % 2 == 1) {
                let value = this.pivotGrid.getCellData(e.row, e.col, false), glyph = 'circle', span = ' <span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                color = '#d8b400';
                if (value != null) {
                    if (value < 0) { // negative variation
                        color = '#9f0000';
                        glyph = 'down';
                    }
                    else if (value > 0.05) { // positive variation
                        color = '#4c8f00';
                        glyph = 'up';
                    }
                    e.cell.innerHTML += span.replace('{glyph}', glyph);
                }
            }
            // apply cell color
            e.cell.style.color = color;
        }
    }
    onShowDetailClick() {
        let sel = this.pivotGrid.selection;
        if (sel.isValid) {
            this.pivotGrid.showDetail(sel.row, sel.col);
        }
        else {
            alert('Please select a cell in the PivotGrid first.');
        }
    }
    customDetailsChange() {
        this.setState({
            customDetails: !this.state.customDetails
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
