import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData, getGroupData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initializeChart = (flex) => {
            this.theChart = flex;
            this.header = document.querySelector('#header');
            this.header.addEventListener('click', (e) => this._onHeaderClick(e));
        };
        this.selectionChanged = () => {
            if (this.theChart.selection) {
                let point = this.theChart.selection.collectionView.currentItem;
                if (point && point.group && !point.group.isBottomLevel) {
                    this.showGroup(point.group);
                }
            }
        };
        this._onHeaderClick = (e) => {
            if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();
                //
                // get the link path
                let path = e.target.href;
                path = path.substr(path.lastIndexOf('#') + 1);
                let paths = path.split('/');
                //
                // find the group that matches the path
                let src = this.state.data;
                for (let i = 1; i < paths.length; i++) {
                    for (let j = 0; j < src.groups.length; j++) {
                        let group = src.groups[j];
                        if (group.name == paths[i]) {
                            src = group;
                            break;
                        }
                    }
                }
                // show the selected group
                this.showGroup(src);
            }
        };
        this.showGroup = (group) => {
            // update titles
            this._updateChartHeader(group);
            var level = 'level' in group ? group.level + 1 : 0;
            this.theChart.axisX.title = wijmo.toHeaderCase(this.state.data.groupDescriptions[level].propertyName);
            //
            // update the series color (use a different one for each level)
            var palette = this.theChart.palette || wjCharts.Palettes.standard;
            this.theChart.series[0].style = {
                fill: palette[level],
                stroke: palette[level]
            };
            //
            // update data
            this.theChart.itemsSource = getGroupData(group);
            this.theChart.selection = null;
        };
        let data = getData();
        this.state = {
            data: data,
            palette: ['rgba(45,159,199,1)', 'rgba(236,153,60,1)', 'rgba(137,194,53,1)', 'rgba(227,119,164,1)', 'rgba(166,137,49,1)', 'rgba(166,114,166,1)', 'rgba(208,192,65,1)', 'rgba(227,88,85,1)', 'rgba(104,112,106,1)'],
            groupedViewData: getGroupData(data)
        };
    }
    ;
    _updateChartHeader(group) {
        let item = group.items[0], path = '', headers = [];
        //
        for (let i = 0; i <= group.level; i++) {
            let prop = this.state.data.groupDescriptions[i].propertyName, hdr = wijmo.format('<a href="#{path}">{prop}</a>: {value}', {
                path: path,
                prop: wijmo.toHeaderCase(prop),
                value: item[prop]
            });
            headers.push(hdr);
            path += '/' + item[prop];
        }
        //
        this.header.innerHTML = headers.length > 0
            ? 'IMF estimates GDP(nominal) GDP for ' + headers.join(', ')
            : 'IMF estimates GDP(nominal) GDP';
    }
    render() {
        return <div className="container-fluid">
            <h4 id="header">IMF estimates GDP(nominal) GDP</h4>
            <wjChart.FlexChart bindingX="name" selectionMode="Point" itemsSource={this.state.groupedViewData} selectionChanged={this.selectionChanged} initialized={this.initializeChart} tooltipContent="" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries name="GDP" binding="gdp"></wjChart.FlexChartSeries>
                <wjChart.FlexChartAxis wjProperty="axisX" title="Year"></wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisY" title="GDP (US$ in billions)"></wjChart.FlexChartAxis>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
