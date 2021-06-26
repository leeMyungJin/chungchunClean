import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as chartAnalytics from '@grapecity/wijmo.chart.analytics';
//
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart');
    //
    // create break-even series
    let series = new chartAnalytics.BreakEven({
        salesPrice: 120,
        variableCost: 20,
        fixedCost: 1000000,
        style: {
            fill: "rgba(127,42,250,0.5)",
            strokeWidth: 0
        },
        altStyle: {
            fill: 'rgba(255,0,0,0.5)',
            strokeWidth: 0
        },
        styles: initStyles(),
    });
    theChart.series.push(series);
    //
    // bind checkboxes events
    'safetyMargin,salesRevenue,totalCost,fixedCost,variableCost,marginalProfit,breakEven'
        .split(',')
        .forEach((s) => {
        let el = document.querySelector('#' + s);
        el.addEventListener('change', () => {
            let styles = initStyles();
            series.styles[s] = el.checked ? styles[s] : null;
            theChart.refresh();
        });
    });
}
function initStyles() {
    return {
        safetyMargin: { fill: "lightgreen", strokeWidth: 0 },
        salesRevenue: { stroke: "rgba(127,42,250,1)", strokeWidth: 3 },
        fixedCost: { stroke: "grey", strokeWidth: 3 },
        totalCost: { stroke: "red", strokeWidth: 3 },
        variableCost: { stroke: "black", strokeWidth: 3 },
        marginalProfit: { stroke: "green", strokeWidth: 3 },
        breakEven: { stroke: "rgba(69,171,235,1)", strokeWidth: 3 }
    };
}
