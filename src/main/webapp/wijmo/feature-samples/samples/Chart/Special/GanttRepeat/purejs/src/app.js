import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexChart } from '@grapecity/wijmo.chart';
import { format } from '@grapecity/wijmo';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create simple Gantt chart
    var theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Bar',
        bindingX: 'index',
        series: [
            { binding: 'start,end' }
        ],
        axisY: {
            majorGrid: false,
            minorGrid: true,
            reversed: true,
            itemFormatter: formatter
        },
        plotMargin: 'auto auto auto 180',
        tooltip: {
            content: getTooltipContent
        }
    });
    // replace item index with item name in Y axis
    function formatter(engine, label) {
        var data = theChart.itemsSource;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.index == label.val) {
                label.text = item.name;
                break;
            }
        }
        return label;
    }
    // show task name and duraction in tooltip
    function getTooltipContent(ht) {
        var str = format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
            name: ht.item.name,
            start: ht.item.start,
            end: ht.item.end
        });
        return str;
    }
}
