import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.chartInitialized = (sender) => {
            sender.dataLabel.content = "{item.count}";
            this.theChart = sender;
            //
            this.theChart.options = {
                funnel: {
                    neckWidth: 0.2,
                    neckHeight: 0.4,
                    type: 'default'
                }
            };
        };
        this.widthChanged = (sender) => {
            this.theChart.options.funnel.neckWidth = sender.value;
            this.theChart.refresh();
        };
        this.heightChanged = (sender) => {
            this.theChart.options.funnel.neckHeight = sender.value;
            this.theChart.refresh();
        };
        this.textChanged = (sender) => {
            this.theChart.options.funnel.type = sender.text.toLowerCase();
            this.theChart.refresh();
        };
        this.state = {
            data: getData(),
            itemsSource: ['Default', 'Rectangle'],
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return Palettes[palettes[rand]];
            })()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="neckWidth">Neck Width: </label>
                <wjInput.InputNumber min={0} max={1} step={0.1} format="p0" value={0.2} valueChanged={this.widthChanged}>
                </wjInput.InputNumber>
            </div>

            <div className="form-group">
                <label htmlFor="neckHeight">Neck Height: </label>
                <wjInput.InputNumber min={0} max={1} step={0.1} format="p0" value={0.4} valueChanged={this.heightChanged}>
                </wjInput.InputNumber>
            </div>
            <div className="form-group">
                <label htmlFor="neckStyle">Neck Style: </label>
                <wjInput.ComboBox itemsSource={this.state.itemsSource} textChanged={this.textChanged}>
                </wjInput.ComboBox>
            </div>

            <wjChart.FlexChart bindingX="stage" itemsSource={this.state.data} palette={this.state.palette} chartType="Funnel" initialized={this.chartInitialized}>
                <wjChart.FlexChartSeries binding="count" name="Sales Pipeline">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
