import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let pie = new chart.FlexPie('#chart', {
        header: 'Market Share By Quarter 2017',
        bindingName: 'brand',
        binding: '2017Q1,2017Q2,2017Q3,2017Q4',
        titles: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataLabel: {
            content: `{value}%`,
            position: chart.PieLabelPosition.Inside
        },
        tooltip: {
            content: '<b>{name}</b><br/>{value}%'
        },
        itemsSource: getData(),
        legend: {
            position: chart.Position.Bottom
        },
        palette: ['rgba(136, 189, 230, 1)', 'rgba(251, 178, 88,1)', 'rgba(144, 205, 151, 1)', 'rgba(246, 170, 201, 1)', 'rgba(191, 165, 84, 1)', 'rgba(188, 153, 199, 1)']
    });
    let chartsPerLine = new input.InputNumber('#chartsPerLine', {
        value: 0,
        min: 0,
        max: 4,
        step: 1,
        format: 'n0',
        valueChanged: (sender) => {
            pie.chartsPerLine = sender.value;
            pie.dataLabel.position = pie.chartsPerLine == 1 ? chart.PieLabelPosition.None : chart.PieLabelPosition.Inside;
        }
    });
}
