import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="unbound" rowCount={20} columnCount={10}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            for (let row = 0; row < flex.rows.length; row++) {
                for (let col = 0; col < flex.columns.length; col++) {
                    flex.setCellData(row, col, row + col);
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
