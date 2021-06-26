import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new wjcCore.CollectionView(getData(), {
                groupDescriptions: ["country"] // group data by country
            }),
            logText: 'please select a range on the grid'
        };
    }
    render() {
        return <div className="container-fluid">
            <div dangerouslySetInnerHTML={{ __html: this.state.logText }} className="log">
            </div>
            <wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        flexgrid.selectionChanged.addHandler(() => {
            if (!flexgrid.selection.isSingleCell) {
                let stats = this.getSelectionStats(flexgrid);
                let fmt = stats.sum != null
                    ? "Avg: <b>{avg:n2}</b>, Count: <b>{cnt:n0}</b>, Sum: <b>{sum:n2}</b>"
                    : "Count: {cnt:n2}";
                this.setState({
                    logText: wjcCore.format(fmt, stats)
                });
            }
            else {
                this.setState({
                    logText: "please select a range on the grid"
                });
            }
        });
    }
    getSelectionStats(grid) {
        let sel = grid.selection, cnt = 0, ncnt = 0, sum = 0;
        for (let r = sel.topRow; r <= sel.bottomRow; r++) {
            for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                let val = grid.cells.getCellData(r, c, false);
                if (val != null) {
                    cnt++;
                    if (wjcCore.isNumber(val)) {
                        ncnt++;
                        sum += val;
                    }
                }
            }
        }
        return {
            cnt: cnt,
            sum: ncnt > 0 ? sum : null,
            avg: ncnt > 0 ? sum / ncnt : null
        };
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
