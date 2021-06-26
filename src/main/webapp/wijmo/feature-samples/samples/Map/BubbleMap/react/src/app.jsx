import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexMap, GeoMapLayer, ScatterMapLayer } from '@grapecity/wijmo.react.chart.map';
import { Point, Rect } from "@grapecity/wijmo";
import { getGdpData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.tooltipContent = (ht) => ht.gdp ? '<b>{name}</b> \${gdp}<br>rank {rank}' : '';
        //
        this.itemsSourceChanged = (layer) => {
            const bb = new Rect(-29, 36, 90, 35);
            layer.map.zoomTo(bb);
            let features = layer.getAllFeatures();
            let pts = [];
            let gdpData = getGdpData();
            let dataMap = new Map();
            gdpData.forEach(el => dataMap.set(el.Country, el));
            features.forEach(f => {
                let rect = layer.map.layers[0].getGeoBBox(f);
                let name = f.properties.name;
                let pt = new Point(rect.left + 0.5 * rect.width, rect.top + 0.5 * rect.height);
                if (name == 'Norway') {
                    pt = new Point(10.752222, 59.913889);
                }
                else if (name == 'Russia') {
                    pt = new Point(37.617222, 55.755833);
                }
                let el = dataMap.get(name);
                if (el) {
                    pts.push({
                        x: pt.x, y: pt.y, name: name, gdp: parseFloat(el[2020]), rank: parseInt(el['Rank'])
                    });
                }
            });
            layer.map.layers[1].itemsSource = pts;
        };
    }
    ;
    //
    render() {
        return <div className="container-fluid">
            <FlexMap header="Europe - GDP per capita" tooltipContent={this.tooltipContent}>
                <GeoMapLayer url="data/europe.json" style={{ fill: 'rgba(153,216,201,1)', stroke: 'white' }} itemsSourceChanged={this.itemsSourceChanged}/>
                <ScatterMapLayer binding="x,y,gdp" symbolMaxSize={20} symbolMinSize={5} style={{ fill: 'rgba(44,162,95,1)' }}/>
            </FlexMap>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
