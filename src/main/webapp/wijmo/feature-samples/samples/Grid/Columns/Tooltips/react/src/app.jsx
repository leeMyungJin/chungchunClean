import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
class App extends React.Component {
    // initialize state
    constructor(props) {
        super(props);
        // column header tooltips
        this.hdrTips = new Tooltip({
            position: PopupPosition.RightTop,
            showAtMouse: true,
            showDelay: 600,
            cssClass: 'hdr-tip'
        });
        this.state = {
            data: this.getData()
        };
    }
    // get some dummy data
    getCountries() {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }
    getData(cnt = 10) {
        let countries = this.getCountries(), data = [];
        for (var i = 0; i < cnt; i++) {
            data.push({
                id: i,
                date: new Date(2020, i % 12, (i + 1) % 25),
                active: i % 4 == 0,
                country: countries[i % countries.length],
                sales: Math.random() * 2000,
                expenses: Math.random() * 1000,
            });
        }
        return data;
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid itemsSource={this.state.data} loadingRows={(s, e) => this.hdrTips.dispose()} formatItem={(s, e) => {
            if (e.panel == s.columnHeaders) {
                this.hdrTips.setTooltip(e.cell, 'this is column<br/>' +
                    '<span class="col-header">' + e.getColumn().header + '</span>');
            }
        }}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
