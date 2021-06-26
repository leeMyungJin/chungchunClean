import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(1000),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'],
                showRowTotals: 'None',
                showColumnTotals: 'Subtotals',
            }),
            showRowTotals: wjcOlap.ShowTotals.None,
            showColumnTotals: wjcOlap.ShowTotals.Subtotals
        };
    }
    initializePivotGrid(pivotGrid) {
        this.pivotGrid = pivotGrid;
    }
    onShowRowTotalsClick(e) {
        this.pivotGrid.engine.showRowTotals = e.target.checked ?
            wjcOlap.ShowTotals.Subtotals : wjcOlap.ShowTotals.None;
        this.setState({
            showRowTotals: this.pivotGrid.engine.showRowTotals
        });
    }
    onShowColumnTotalsClick(e) {
        this.pivotGrid.engine.showColumnTotals = e.target.checked ?
            wjcOlap.ShowTotals.Subtotals : wjcOlap.ShowTotals.None;
        this.setState({
            showColumnTotals: this.pivotGrid.engine.showColumnTotals
        });
    }
    componentDidMount() {
        this.state.ng.fields.getField('Amount').format = 'c0';
        this.state.ng.fields.getField('Date').format = 'yyyy';
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-7">
                        <Olap.PivotGrid itemsSource={this.state.ng} initialized={this.initializePivotGrid.bind(this)}></Olap.PivotGrid>
                    </div>
                </div>
                <p>
                    You can configure the <b>PivotEngine</b> to show the row totals
                    using the <b>showRowTotals</b> property:
                </p>
                <label>
                    showRowTotals:{' '}
                    <input id="showRowTotals" type="checkbox" onClick={this.onShowRowTotalsClick.bind(this)}/>
                </label>
                <p>
                    You can configure the <b>PivotGrid</b> to show column totals
                using the <b>showColumnTotals</b> property:
                </p>
                <label>
                    showColumnTotals:{' '}
                    <input id="showColumnTotals" type="checkbox" checked={this.state.showColumnTotals} onClick={this.onShowColumnTotalsClick.bind(this)}/>
                </label>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
