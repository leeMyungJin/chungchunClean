import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { httpRequest } from '@grapecity/wijmo';
import { Position, Palettes } from '@grapecity/wijmo.chart';
import { FlexMap, GeoMapLayer, ColorScale } from '@grapecity/wijmo.chart.map';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let map = new FlexMap('#map', {
        header: 'Average Temperature By State',
        legend: { position: Position.Left },
        tooltip: { content: (f) => f.name + ' ' + dataMap.get(f.name) + '°F' },
        layers: [
            new GeoMapLayer({
                url: 'data/US.json',
                itemsSourceChanged: (s, a) => { map.zoomTo(s.getGeoBBox()); },
                colorScale: new ColorScale({
                    colors: Palettes.Diverging.RdYlBu,
                    binding: (o) => dataMap.get(o.properties.name),
                    scale: (v) => 1 - v,
                    format: 'n0"°F"'
                })
            })
        ]
    });
    let dataMap = new Map();
    httpRequest('data/temp.json', {
        success: xhr => {
            JSON.parse(xhr.responseText).forEach(el => dataMap.set(el.State, parseFloat(el.AverageTemperature)));
        }
    });
}
//
