import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Chart from '@grapecity/wijmo.react.chart';
import * as Input from '@grapecity/wijmo.react.input';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import { getData, getComboData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            comboData: getComboData(),
            palette: this.getRandomPalette(),
            position: "Top",
            downloadsOnly: false,
            showLinesAndBorders: false,
        };
    }
    render() {
        return <div className="container">
            <div className="form-group">
                <label>Label Position: 
                    <Input.ComboBox itemsSource={this.state.comboData} textChanged={this.textChanged.bind(this)} text={this.state.position}>
                    </Input.ComboBox>
                </label>
                <label>Lines/Borders: 
                    <input id="checkBoxLinesAndBorders" type="checkbox" checked={this.state.showLinesAndBorders} onChange={this.showLinesAndBordersChanged.bind(this)}/><br />
                </label>
                <label>2016 Only: 
                    <input id="checkBoxDownloadsOnly" type="checkbox" checked={this.state.downloadsOnly} onChange={this.downloadsOnlyChanged.bind(this)}/><br />
                </label>
               <div className="form-group">
                    <Chart.FlexChart bindingX="country" itemsSource={this.state.data} tooltipContent="" header="Country GDP" initialized={this.chartInitialized.bind(this)} palette={this.state.palette}>
                        <Chart.FlexChartSeries name="2014" binding="2014"></Chart.FlexChartSeries>
                        <Chart.FlexChartSeries name="2015" binding="2015"></Chart.FlexChartSeries>
                        <Chart.FlexChartSeries name="2016" binding="2016"></Chart.FlexChartSeries>
                        <Chart.FlexChartDataLabel content="{value:n0,,}T" position={this.state.position}></Chart.FlexChartDataLabel>
                    </Chart.FlexChart>
                </div>
            </div>
        </div>;
    }
    chartInitialized(flex) {
        this.theChart = flex;
        flex.dataLabel.rendering.addHandler(function (_, e) {
            if (this.state.downloadsOnly && e.hitTestInfo.series.binding != '2016') {
                e.cancel = true; // labels only for the "downloads" series
            }
        }, this);
    }
    textChanged(s) {
        this.setState({
            position: s.text
        });
    }
    showLinesAndBordersChanged() {
        if (this.theChart) {
            let dl = this.theChart.dataLabel;
            dl.connectingLine = dl.border = !this.state.showLinesAndBorders;
        }
        this.setState({
            showLinesAndBorders: !this.state.showLinesAndBorders
        });
    }
    downloadsOnlyChanged() {
        if (this.theChart) {
            this.setState({
                downloadsOnly: !this.state.downloadsOnly
            });
            this.theChart.invalidate();
        }
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
