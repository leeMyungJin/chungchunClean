import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.
                getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid isReadOnly={true} allowResizing="None" alternatingRowStep={1} initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="rank" header="#" width={50}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="title" header="Title" width="2*"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="rating" header="Rating" width="*" align="center" cssClass="cell-rating"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="attendance" header="Attendance" width="2*" cssClass="cell-attendance"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="revenue" header="Revenue" width="2*" cssClass="cell-revenue"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.formatItem.addHandler((s, e) => {
            if (e.panel == s.cells) {
                var item = s.rows[e.row].dataItem;
                switch (s.columns[e.col].binding) {
                    case "rating":
                        this._formatRatingCell(e.cell, item.rating);
                        break;
                    case "attendance":
                        this._formatAttendanceCell(e.cell, item.attendance);
                        break;
                    case "revenue":
                        this._formatRevenueCell(e.cell, item.revenue);
                        break;
                }
            }
        });
    }
    _formatRatingCell(cell, rating) {
        let html = '<div aria-label="rating:' + rating + ' stars">';
        for (let i = 0; i < rating; i++) {
            html += '<span class="glyphicon glyphicon-star"></span>';
        }
        html += "</div>";
        cell.innerHTML = html;
    }
    _formatAttendanceCell(cell, data) {
        cell.innerHTML = this._getSparklines(data);
    }
    _formatRevenueCell(cell, data) {
        cell.innerHTML = this._getSparkbars(data);
    }
    // generate sparklines as SVG
    _getSparklines(data) {
        let svg = "", min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), x1 = 0, y1 = this._scaleY(data[0], min, max), x2, y2;
        for (let i = 1; i < data.length; i++) {
            x2 = Math.round((i / (data.length - 1)) * 100);
            y2 = this._scaleY(data[i], min, max);
            svg +=
                "<line x1=" +
                    x1 +
                    "% y1=" +
                    y1 +
                    "% x2=" +
                    x2 +
                    "% y2=" +
                    y2 +
                    "% />";
            x1 = x2;
            y1 = y2;
        }
        return this._wrapSvg(svg, "sparklines");
    }
    _getSparkbars(data) {
        let svg = "", min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), base = Math.min(max, Math.max(min, 0)), basey = this._scaleY(base, min, max), w = Math.round(100 / data.length) - 2, x, y;
        for (let i = 0; i < data.length; i++) {
            x = i * Math.round(100 / data.length) + 1;
            y = this._scaleY(data[i], min, max);
            svg +=
                "<rect x=" +
                    x +
                    "% width=" +
                    w +
                    "% y=" +
                    Math.min(y, basey) +
                    "% height=" +
                    Math.abs(y - basey) +
                    "% />";
        }
        svg +=
            "<rect x=0% width=100% height=1 y=" + basey + "% opacity=.5 />";
        return this._wrapSvg(svg, "sparkbars");
    }
    _scaleY(value, min, max) {
        return 100 - Math.round(((value - min) / (max - min)) * 100);
    }
    _wrapSvg(svg, title) {
        return ('<div aria-label="' +
            title +
            '" ' +
            'style="width:100%;height:100%;box-sizing:border-box;padding:4px">' +
            '<svg width="100%" height="100%" style="stroke:currentColor;"><g>' +
            svg +
            "</g></svg></div>");
    }
    getData() {
        return [
            {
                rank: 1,
                title: "The Wizard of Oz",
                rating: 4,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 2,
                title: "Citizen Kane",
                rating: 5,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 3,
                title: "The Godfather",
                rating: 5,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 4,
                title: "Metropolis",
                rating: 4,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 5,
                title: "Singing' in the Rain",
                rating: 2,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 6,
                title: "Casablanca",
                rating: 3,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 7,
                title: "Alien",
                rating: 5,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 8,
                title: "Vertigo",
                rating: 2,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 9,
                title: "Gone with the Wind",
                rating: 4,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            },
            {
                rank: 10,
                title: "Chinatown",
                rating: 2,
                attendance: this._getArr(40),
                revenue: this._getArr(20)
            }
        ];
    }
    _getArr(len) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(Math.round(Math.random() * 100));
        }
        return arr;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
