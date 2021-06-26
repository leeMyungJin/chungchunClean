import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexChartLegend } from "@grapecity/wijmo.react.chart";
import { FlexMap, GeoMapLayer, ColorScale } from '@grapecity/wijmo.react.chart.map';
import { Palettes } from "@grapecity/wijmo.chart";
import { httpRequest } from "@grapecity/wijmo";
//
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.dataMap = new Map();
        //
        this.zoomTo = (layer) => {
            layer.map.zoomTo(layer.getGeoBBox());
        };
        //
        this.tooltipContent = (f) => f.name + ' ' + this.dataMap.get(f.name) + '°F';
        //
        this.binding = (o) => this.dataMap.get(o.properties.name);
        //
        this.scale = (v) => 1 - v;
    }
    //
    render() {
        return <div className="container-fluid">
            <FlexMap header="Average Temperature By State" tooltipContent={this.tooltipContent}>
                <GeoMapLayer url="data/US.json" itemsSourceChanged={this.zoomTo}>
                    <ColorScale colors={Palettes.Diverging.RdYlBu} binding={this.binding} scale={this.scale} format='n0"°F"'/>
                </GeoMapLayer>
                <FlexChartLegend position="Left"></FlexChartLegend>
            </FlexMap>
        </div>;
    }
    //
    componentDidMount() {
        httpRequest('data/temp.json', {
            success: xhr => {
                JSON.parse(xhr.responseText).forEach(el => this.dataMap.set(el.State, parseFloat(el.AverageTemperature)));
            }
        });
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
