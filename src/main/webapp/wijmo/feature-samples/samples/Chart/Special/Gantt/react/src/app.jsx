import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { clamp, format, isArray, isNumber, Rect } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.chartInitialized = (sender) => {
            sender.tooltip.content = this.getTooltipContent;
        };
        this.getTooltipContent = (ht) => {
            let str = format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
                name: ht.x,
                start: ht.item.start,
                end: ht.item.end
            });
            //
            if (ht.item && ht.item.percent != null) {
                str += format('<br/><i>percent complete: {percent}%</i>', ht.item);
            }
            //
            return str;
        };
        // show the percentage complete for each task
        this.ganttItemFormatter = (engine, ht, defaultFormatter) => {
            // draw the item as usual
            defaultFormatter();
            //
            // show percentage done
            let task = ht.item;
            //
            if (isNumber(task.percent) && task.percent > 0) {
                let pct = clamp(task.percent, 0, 100) / 100, rc = this.$_getTaskRect(ht.series.chart, task).inflate(-8, -8);
                //
                engine.fill = pct == 1 ? 'green' : 'gold'; //engine.stroke;
                engine.drawRect(rc.left, rc.top, rc.width * pct, rc.height);
            }
        };
        // show the task dependencies
        this.ganttChartRendered = (chart, e) => {
            let tasks = chart.collectionView.items;
            //
            tasks.forEach(task => {
                let parents = this.$_getTaskParents(task, tasks); // get the parent tasks
                //
                parents.forEach(parent => {
                    this.$_drawConnectingLine(e.engine, chart, task, parent); // draw connector
                });
            });
        };
        this.$_drawConnectingLine = (engine, chart, task, parent) => {
            let rc1 = this.$_getTaskRect(chart, parent), // parent rect
            rc2 = this.$_getTaskRect(chart, task), // task rect
            x1 = rc1.left + rc1.width / 2, // parent x center
            x2 = rc2.left, // task left
            y1 = rc1.bottom, // parent bottom
            y2 = rc2.top + rc2.height / 2; // task y center
            //
            // draw connecting line
            let xs = [x1, x1, x2], ys = [y1, y2, y2];
            //
            engine.drawLines(xs, ys, 'connector', {
                stroke: 'black'
            });
            //
            // draw arrow at the end
            let sz = 5;
            //
            xs = [x2 - 2 * sz, x2, x2 - 2 * sz];
            ys = [y2 - sz, y2, y2 + sz];
            //
            engine.drawPolygon(xs, ys, 'arrow', {
                fill: 'black'
            });
        };
        this.$_getTaskRect = (chart, task) => {
            let x1 = chart.axisX.convert(task.start.valueOf()), x2 = chart.axisX.convert(task.end.valueOf()), index = chart.collectionView.items.indexOf(task), y1 = chart.axisY.convert(index - .35), y2 = chart.axisY.convert(index + .35);
            //
            return new Rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
        };
        this.$_getTaskParents = (task, tasks) => {
            let parents = [];
            //
            if (task.parent) {
                task.parent.split(',').forEach(name => {
                    for (let i = 0; i < tasks.length; i++) {
                        if (tasks[i].name === name) {
                            parents.push(tasks[i]);
                            break;
                        }
                    }
                });
            }
            //
            return parents;
        };
        this.state = {
            data: getData(),
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
            <wjChart.FlexChart itemsSource={this.state.data} itemFormatter={this.ganttItemFormatter} rendered={this.ganttChartRendered} palette={this.state.palette} chartType="Bar" bindingX="name" initialized={this.chartInitialized}>
                <wjChart.FlexChartSeries binding="start,end"></wjChart.FlexChartSeries>
                <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false} minorGrid={true} reversed={true}>
                </wjChart.FlexChartAxis>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
