import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import { getData, getChartTypeData, getStepPositionData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Step',
        bindingX: 'month',
        legend: {
            position: 'Top'
        },
        axisX: {
            axisLine: false,
            majorTickMarks: "None"
        },
        axisY: {
            majorGrid: false
        },
        options: {
            step: {
                position: 'center'
            }
        },
        series: [
            { binding: 'sms', name: 'SMS Totals' },
            { binding: 'email', name: 'Email Totals' },
        ]
    });
    var chartType = new wjInput.ComboBox('#chartType', {
        itemsSource: getChartTypeData(),
        textChanged: function (s, e) {
            theChart.chartType = s.text;
        },
        text: 'Step'
    });
    var stepPosition = new wjInput.ComboBox('#stepPosition', {
        itemsSource: getStepPositionData(),
        textChanged: function (s, e) {
            theChart.options = { step: { position: s.text.toLowerCase() } };
        },
        text: 'Center'
    });
}
