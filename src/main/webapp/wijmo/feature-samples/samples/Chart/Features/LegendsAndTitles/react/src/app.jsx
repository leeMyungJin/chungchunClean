import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//    
import { isArray, addClass, toggleClass } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as Chart from '@grapecity/wijmo.react.chart';
import * as Input from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            header: "My Great Chart",
            footer: "powered by Wijmo's FlexChart",
            xTitle: "country",
            yTitle: "values/units",
            customTitles: true,
            customLegend: true,
            legendPositionSource: ['None', 'Left', 'Top', 'Right', 'Bottom'],
            legendPosition: 'Left'
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <div>
                <label>Header:</label>
                <Input.ComboBox textChanged={this.headerChanged.bind(this)} text={this.state.header}>
                </Input.ComboBox>
            </div>

            <div>
                <label>Footer:</label>
                <Input.ComboBox textChanged={this.footerChanged.bind(this)} text={this.state.footer}>
                </Input.ComboBox>
            </div>

            <div>
                <label>X-Axis Title:</label>
                <Input.ComboBox textChanged={this.xTitleChanged.bind(this)} text={this.state.xTitle}>
                </Input.ComboBox>
            </div>

            <div>
                <label>Y-Axis Title:</label>
                <Input.ComboBox textChanged={this.yTitleChanged.bind(this)} text={this.state.yTitle}>
                </Input.ComboBox>
            </div>

            <div>
                <label htmlFor="customTitles">Custom Titles: </label>
                <input id="customTitles" type="checkbox" checked={this.state.customTitles} onChange={this.customTitlesChanged.bind(this)}/>
            </div>

            <div>
                <label htmlFor="customLegend">Custom Legend: </label>
                <input id="customLegend" type="checkbox" checked={this.state.customLegend} onChange={this.customLegendChanged.bind(this)}/>
            </div>

            <div>
                <label>Legend Position: </label>
                <Input.ComboBox itemsSource={this.state.legendPositionSource} textChanged={this.legendPositionChanged.bind(this)} text={this.state.legendPosition}>
                </Input.ComboBox>
            </div>

            <div className="form-group">
                <Chart.FlexChart header={this.state.header} footer={this.state.footer} bindingX="country" palette={this.state.palette} itemsSource={this.state.data} initialized={this.chartInitialized.bind(this)}>
                    <Chart.FlexChartAxis wjProperty="axisX" title={this.state.xTitle}></Chart.FlexChartAxis>
                    <Chart.FlexChartAxis wjProperty="axisY" title={this.state.yTitle}></Chart.FlexChartAxis>
                    <Chart.FlexChartSeries binding="sales" name="Sales"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="expenses" name="Expenses"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="downloads" name="Downloads"></Chart.FlexChartSeries>
                    <Chart.FlexChartLegend position={this.state.legendPosition}></Chart.FlexChartLegend>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
    chartInitialized(chart) {
        this.theChart = chart;
        addClass(chart.hostElement, 'custom-titles custom-legend');
    }
    headerChanged(combo) {
        this.setState({
            header: combo.text
        });
    }
    footerChanged(combo) {
        this.setState({
            footer: combo.text
        });
    }
    //
    xTitleChanged(combo) {
        this.setState({
            xTitle: combo.text
        });
    }
    //
    yTitleChanged(combo) {
        this.setState({
            yTitle: combo.text
        });
    }
    //
    customTitlesChanged() {
        this.setState({
            customTitles: !this.state.customTitles
        });
        if (this.theChart) {
            toggleClass(this.theChart.hostElement, 'custom-titles');
        }
    }
    //
    customLegendChanged() {
        this.setState({
            customLegend: !this.state.customLegend
        });
        if (this.theChart) {
            toggleClass(this.theChart.hostElement, 'custom-legend');
        }
    }
    //
    legendPositionChanged(combo) {
        this.setState({
            legendPosition: combo.text
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
