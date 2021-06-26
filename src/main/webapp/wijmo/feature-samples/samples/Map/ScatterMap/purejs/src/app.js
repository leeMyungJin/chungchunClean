import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { FlexMap, GeoMapLayer, GeoGridLayer, ScatterMapLayer } from '@grapecity/wijmo.chart.map';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let map = new FlexMap('#map', {
        header: 'Airport Map',
        tooltip: { content: '&#9992; <b>{iata_code}</b><br>{name}' },
        layers: [
            new GeoMapLayer({
                style: { fill: 'rgba(200,200,200,1)' },
                url: 'data/land.json'
            }),
            new ScatterMapLayer({
                url: 'data/airports.json',
                binding: 'coordinates',
                style: { fill: 'rgba(10,10,10,1)' },
                itemsSourceChanged: (s, a) => { map.zoomTo(s.getGeoBBox()); }
            }),
            new GeoGridLayer()
        ]
    });
}
