import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGridSheet from '@grapecity/wijmo.react.grid.sheet';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Custom Function" rowCount={20} columnCount={10}></wjGridSheet.Sheet>
                    <wjGridSheet.Sheet name="Data" rowCount={20} columnCount={10}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.addFunction('customSumProduct', (...params) => {
            let result = 0, range1 = params[0], range2 = params[1];
            if (range1.length > 0 && range1.length === range2.length && range1[0].length === range2[0].length) {
                for (let i = 0; i < range1.length; i++) {
                    for (let j = 0; j < range1[0].length; j++) {
                        result += range1[i][j] * range2[i][j];
                    }
                }
            }
            return result;
        }, 'Custom SumProduct Function', 2, 2);
        flex.unknownFunction.addHandler((sender, e) => {
            let result = '';
            if (e.params) {
                for (let i = 0; i < e.params.length; i++) {
                    result += e.params[i];
                }
            }
            e.value = result;
        });
        flex.deferUpdate(() => {
            for (let i = flex.sheets.length - 1; i >= 0; i--) {
                flex.sheets.selectedIndex = i;
                switch (flex.sheets[i].name) {
                    case 'Custom Function':
                        flex.setCellData(0, 0, '=customSumProduct(Data!A1:B5, Data!B1:C5)');
                        flex.setCellData(1, 0, '=customFunc(1, "B", 3)');
                        break;
                    case 'Data':
                        for (let ri = 0; ri < flex.rows.length; ri++) {
                            for (let ci = 0; ci < 3; ci++) {
                                flex.setCellData(ri, ci, ri + ci);
                            }
                        }
                        break;
                }
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
