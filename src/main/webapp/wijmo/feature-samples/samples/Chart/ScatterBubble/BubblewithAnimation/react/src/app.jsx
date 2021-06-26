import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as chart from '@grapecity/wijmo.chart';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.animLength = 15000;
        this.chartItemFormatter = (engine, hitTestInfo, defaultFormat) => {
            if (hitTestInfo.chartElement == chart.ChartElement.SeriesSymbol) {
                let fill = 'black', stroke = 'black';
                switch (hitTestInfo.item.region) {
                    case 'Sub-Saharan Africa':
                        fill = '#1F77B4';
                        break;
                    case 'South Asia':
                        fill = '#FF7F0E';
                        break;
                    case 'Middle East & North Africa':
                        fill = '#2CA02C';
                        break;
                    case 'America':
                        fill = '#D62728';
                        break;
                    case 'Europe & Central Asia':
                        fill = '#9467BD';
                        break;
                    case 'East Asia & Pacific':
                        fill = '#8C564B';
                        break;
                }
                engine.fill = fill;
                engine.stroke = stroke;
                engine.strokeWidth = 1;
                defaultFormat();
            }
        };
        this.toggleAnimation = () => {
            if (this.state.animating) {
                this.stopAnimation();
            }
            else {
                let min = (this.state.year < this.state.yrMax - 10) ? this.state.year : this.state.yrMin, max = this.state.yrMax, duration = this.animLength * (max - min) / (this.state.yrMax - this.state.yrMin);
                let anim = wjcCore.animate((pct) => {
                    this._setYear(Math.round(min + (max - min) * pct));
                    if (pct == 1) {
                        this.stopAnimation();
                    }
                }, duration);
                this.setState({
                    animating: anim
                });
            }
        };
        this.stopAnimation = () => {
            if (this.state.animating) {
                clearInterval(this.state.animating);
                this.setState({ animating: 0 });
            }
        };
        this.onChartInitialized = (sender) => {
            sender.tooltip.content = function (ht) {
                let item = ht.item;
                return `<b>${item.name}</b><br/>${wjcCore.Globalize.format(item.yearPopulation, 'g1,,')} million people`;
            };
            sender.hostElement.addEventListener('mousedown', () => {
                this.stopAnimation();
            }, true);
        };
        this.onGaugeInitialized = (sender) => {
            sender.face.thickness = 0.08;
            sender.hostElement.addEventListener('mousedown', () => {
                this.stopAnimation();
            }, true);
        };
        this.onGaugeValueChanged = (sender) => {
            this._setYear(sender.value);
        };
        this._setYear = (value) => {
            this.setState({ year: value });
            this._updateData();
        };
        this._updateData = () => {
            let year = this.state.year, items = this.state.data.items;
            items.forEach((item) => {
                item.yearIncome = this._interpolate(item.income, year);
                item.yearLifeExpectancy = this._interpolate(item.lifeExpectancy, year);
                let pop = this._interpolate(item.population, year);
                if (pop > 1000000)
                    pop = Math.round(pop / 1000000) * 1000000;
                item.yearPopulation = pop;
            });
            this.state.data.refresh();
        };
        this._interpolate = (arr, year) => {
            let min = 0, max = arr.length - 1, cur, item;
            while (min <= max) {
                cur = (min + max) >>> 1,
                    item = arr[cur];
                if (item[0] > year) {
                    max = cur - 1;
                }
                else if (item[0] < year) {
                    min = cur + 1;
                }
                else {
                    return item[1]; // found year, no need to interpolate
                }
            }
            // before the first/after the last
            if (min == 0)
                return arr[min][1];
            if (min == arr.length)
                return arr[max][1];
            // in range: interpolate
            let pct = (year - arr[max][0]) / (arr[min][0] - arr[max][0]);
            return arr[max][1] + pct * (arr[min][1] - arr[max][1]);
        };
        this.state = {
            year: 1800,
            yrMin: 1800,
            yrMax: 2009,
            animating: 0,
            data: getData()
        };
    }
    componentDidMount() {
        this.toggleAnimation();
    }
    render() {
        return <div className="container-fluid">

            <div className="yearpicker">
                <wjGauge.LinearGauge value={this.state.year} min={this.state.yrMin} max={this.state.yrMax} isReadOnly={false} isAnimated={false} thumbSize={30} valueChanged={this.onGaugeValueChanged} initialized={this.onGaugeInitialized}>
                    <wjGauge.Range wjProperty="pointer" thickness={0.08}/>
                </wjGauge.LinearGauge>
                <button className="btn btn-success" onClick={this.toggleAnimation}>
                    <span className={this.state.animating ? 'glyphicon-stop glyphicon' : 'glyphicon-play glyphicon'}></span>
                </button>
            </div>

            <wjChart.FlexChart initialized={this.onChartInitialized} itemsSource={this.state.data} chartType="Bubble" itemFormatter={this.chartItemFormatter} options={{ bubble: { minSize: 5, maxSize: 100 } }} bindingX="yearIncome" tooltipContent="<b>{item.name}</b><br/>{yearPopulation:g1,,} million people" selectionMode="Point" className={[this.state.data.currentItem ? 'tracking-country' : '', 'wj-control', 'wj-flexchart']}>
                <div className="watermark">
                    {this.state.year}
                </div>
                <wjChart.FlexChartSeries binding="yearLifeExpectancy,yearPopulation"/>
                <wjChart.FlexChartAxis wjProperty="axisX" title="income per capita (inflation-adjusted US dollars)" majorGrid={false} axisLine={true} min={300} max={100000} logBase={10}/>
                <wjChart.FlexChartAxis wjProperty="axisY" title="life expectancy (years)" majorGrid={false} axisLine={true} min={20} max={85} majorUnit={10}/>
                <wjChart.FlexChartLegend position="None"/>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
