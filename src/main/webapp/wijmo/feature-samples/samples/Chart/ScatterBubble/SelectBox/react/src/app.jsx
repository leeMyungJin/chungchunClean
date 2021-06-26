import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
const wjSelected = 'wj-state-selected';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.rendered = false;
        this.selections = [];
        this.mouseDown = false;
        this.start = null;
        this.end = null;
        this.selector = null;
        this.offset = null;
        this.mousePt = null;
        this.isTouch = false;
        this.items = [];
        this.chartInitialized = (sender) => {
            this.chart = sender;
        };
        this.chartRendered = (sender) => {
            if (!this.rendered) {
                sender.hostElement.addEventListener('mousedown', this.$_chartMouseDown.bind(this));
                sender.hostElement.addEventListener('mousemove', this.$_chartMouseMove.bind(this));
                sender.hostElement.addEventListener('mouseup', this.$_chartMouseUp.bind(this));
                sender.hostElement.addEventListener('mouseleave', this.$_chartMouseLeave.bind(this));
                sender.hostElement.addEventListener('click', this.$_chartClick.bind(this));
                window.addEventListener('touchstart', () => this.isTouch = true, false);
                //
                // boolean flag - don't re-add event listener after resize
                this.rendered = true;
                //
                this.selector = document.querySelector('#plotSelection');
                sender.hostElement.appendChild(this.selector);
            }
            else {
                // *visually* restore selection after redraw (ex. resize browser, change chart type)
                this.$_restoreSelection();
            }
        };
        this.state = {
            series1: getData(50, 0, 3),
            series2: getData(40, 100, 12),
            series3: getData(30, -100, 24)
        };
    }
    render() {
        return <div className="container-fluid">
            <div id="plotSelection"></div>
            <wjChart.FlexChart chartType="Scatter" bindingX="x" initialized={this.chartInitialized} rendered={this.chartRendered}>
                <wjChart.FlexChartAxis wjProperty="axisY" axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries name="Experiment 1" itemsSource={this.state.series1} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Experiment 2" itemsSource={this.state.series2} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Experiment 3" itemsSource={this.state.series3} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
    $_clearSelection() {
        this.selections.forEach((item) => {
            let series = item.series, el = series.getPlotElement(item.pointIndex);
            //
            if (el) {
                wjCore.removeClass(el, wjSelected);
            }
        });
        //
        this.selections.length = 0;
    }
    // helper for adding chart selection
    $_addSelection(ht) {
        wjCore.addClass(ht.series.getPlotElement(ht.pointIndex), wjSelected);
        this.selections.push({
            series: ht.series,
            pointIndex: ht.pointIndex
        });
    }
    // helper for removing chart selection
    $_removeSelection(ht) {
        let items = this.selections.filter((item) => item.series === ht.series && item.pointIndex === ht.pointIndex), idx = items && items.length > 0 ? this.selections.indexOf(items[0]) : -1;
        //
        if (idx >= 0) {
            this.selections.splice(idx, 1);
            wjCore.removeClass(ht.series.getPlotElement(ht.pointIndex), wjSelected);
        }
    }
    // finds selected plot elements after rendering and applies CSS to visually represent selection
    $_restoreSelection() {
        this.selections.forEach((item) => {
            let series = item.series, el = series.getPlotElement(item.pointIndex);
            //
            if (el) {
                wjCore.addClass(el, wjSelected);
            }
        });
    }
    // helper to hide the selector
    $_hideSelector() {
        wjCore.setCss(this.selector, {
            'visibility': 'hidden',
            'width': 0,
            'height': 0,
            'left': 0,
            'top': 0
        });
    }
    // selects plot elements within drawn rectangle
    $_selectWithinRect(rect) {
        if (!rect || !this.chart) {
            return;
        }
        //
        this.chart.series.forEach((item) => {
            let pointCount = item._getLength();
            //
            for (let j = 0; j < pointCount; j++) {
                let el = item.getPlotElement(j);
                //
                if (this.$_elementInBounds(el, rect)) {
                    this.$_addSelection({
                        series: item,
                        pointIndex: j
                    });
                }
            }
        });
    }
    // helper to determine if plot element is within the bounds of the drawn rectangle
    $_elementInBounds(el, rect) {
        let box = el.getBoundingClientRect();
        return !(box.left > rect.right || box.right < rect.left || box.top > rect.bottom || box.bottom < rect.top);
    }
    // clear selection for button click
    $_clear() {
        this.$_clearSelection();
        // update length for view
        this.items.length = 0;
    }
    $_chartClick(e) {
        if (this.mouseDown && !this.isTouch) {
            this.isTouch = false;
            return;
        }
        //
        let p = wjCore.mouseToPage(e);
        if (this.mousePt.x !== p.x || this.mousePt.y !== p.y) {
            return;
        }
        //
        let element = e.target, ht = this.chart.hitTest(e), selected = false, chartType = this.chart.chartType;
        //
        selected = this.selections.some((item) => {
            return item.series === ht.series && item.pointIndex === ht.pointIndex;
        });
        //
        if (ht && ht.series && !selected && ((ht.distance <= 0 && (chartType == 0 || chartType == 1)) || ht.distance <= 15) && this.isTouch) {
            // remove selection
            if (wjCore.hasClass(element, wjSelected)) {
                this.$_removeSelection(ht);
            }
            else {
                // add selection
                this.$_addSelection(ht);
            }
        }
        else if (selected && ((ht.distance <= 0 && (chartType == 0 || chartType == 1)) || ht.distance <= 15) && this.isTouch) {
            this.$_removeSelection(ht);
        }
        else {
            this.$_clearSelection();
        }
        //
        this.isTouch = false;
        // update length for view
        this.items.length = 0;
        this.items.push.apply(this.items, this.selections);
    }
    $_chartMouseDown(e) {
        this.mousePt = wjCore.mouseToPage(e);
        this.mouseDown = true;
        e.preventDefault();
    }
    $_chartMouseUp(e) {
        if (this.start != null) {
            this.start = null;
        }
        //
        if (this.end != null) {
            let host = this.chart.hostElement;
            this.offset = wjCore.getElementRect(host);
            let style = host.getAttribute('style');
            this.offset.left = this.offset.left + parseInt(style ? style['padding-left'].replace('px', '') : 0);
            this.offset.top = this.offset.top + parseInt(style ? style['padding-top'].replace('px', '') : 0);
            //
            this.end = this.start = null;
            //
            this.$_clear();
            this.$_selectWithinRect(this.selector.getBoundingClientRect());
            //
            // update length for view
            this.items.length = 0;
            this.items.push.apply(this.items, this.selections);
            //
            e.preventDefault();
        }
        //
        this.$_hideSelector();
        this.mouseDown = false;
    }
    $_chartMouseMove(e) {
        let p = wjCore.mouseToPage(e);
        if (!this.mouseDown || (this.mousePt.x == p.x && this.mousePt.y == p.y)) {
            return;
        }
        //
        let pt = e instanceof MouseEvent ? new wjCore.Point(e.pageX, e.pageY) : new wjCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        //
        if (this.start != null) {
            this.end = pt;
            //
            // update selector rectangle
            let w = pt.x - this.start.x;
            let h = pt.y - this.start.y;
            //
            if (w >= 0) {
                wjCore.setCss(this.selector, {
                    'left': this.start.x - this.offset.left,
                    'width': w
                });
            }
            else {
                wjCore.setCss(this.selector, {
                    'left': pt.x - this.offset.left,
                    'width': -w
                });
            }
            //
            if (h >= 0) {
                wjCore.setCss(this.selector, {
                    'top': this.start.y - this.offset.top,
                    'height': h
                });
            }
            else {
                wjCore.setCss(this.selector, {
                    'top': pt.y - this.offset.top,
                    'height': -h
                });
            }
        }
        else {
            wjCore.setCss(this.selector, {
                'visibility': 'visible'
            });
            this.offset = wjCore.getElementRect(this.selector);
            //
            this.start = pt;
        }
        //
        e.preventDefault();
    }
    $_chartMouseLeave(e) {
        if (this.start) {
            this.start = this.end = null;
            this.mouseDown = false;
            this.$_hideSelector();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
