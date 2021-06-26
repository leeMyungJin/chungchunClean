import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initPie = (sender) => {
            this.pieChart = sender;
            sender.dataLabel.content = "{value}%";
        };
        this.state = {
            data: getData(),
            titles: ['Q1', 'Q2', 'Q3', 'Q4'],
            palette: ['rgba(136, 189, 230, 1)', 'rgba(251, 178, 88,1)', 'rgba(144, 205, 151, 1)', 'rgba(246, 170, 201, 1)', 'rgba(191, 165, 84, 1)', 'rgba(188, 153, 199, 1)'],
            chartsPerLine: 0
        };
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    render() {
        return <div className="container-fluid">
            <label htmlFor="chartsPerLine">Charts Per Line: </label>
            <wjInput.InputNumber id="chartsPerLine" value={this.state.chartsPerLine} valueChanged={this.onValueChanged} min={0} max={4} step={1} format="n0">
            </wjInput.InputNumber>

            <wjChart.FlexPie header="Market Share By Quarter 2017" bindingName="brand" binding="2017Q1,2017Q2,2017Q3,2017Q4" chartsPerLine={this.state.chartsPerLine} initialized={this.initPie} itemsSource={this.state.data} titles={this.state.titles} palette={this.state.palette}>
                <wjChart.FlexPieDataLabel position="Inside"></wjChart.FlexPieDataLabel>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
            </wjChart.FlexPie>
        </div>;
    }
    onValueChanged(sender) {
        this.setState({ chartsPerLine: sender.value });
        this.pieChart.dataLabel.position = sender.value == 1 ? chart.PieLabelPosition.None : chart.PieLabelPosition.Inside;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
