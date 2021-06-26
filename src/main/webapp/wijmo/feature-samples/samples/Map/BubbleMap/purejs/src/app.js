import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Point, Rect } from '@grapecity/wijmo';
import { FlexMap, GeoMapLayer, ScatterMapLayer } from '@grapecity/wijmo.chart.map';
import { getGdpData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let map = new FlexMap('#map', {
        header: 'Europe - GDP per capita',
        tooltip: {
            content: (ht) => {
                return ht.gdp ? '<b>{name}</b> \${gdp}<br>rank {rank}' : '';
            }
        },
        layers: [
            new GeoMapLayer({
                url: 'data/europe.json',
                itemsSourceChanged: (layer, a) => {
                    const bb = new Rect(-29, 36, 90, 35);
                    map.zoomTo(bb);
                    let features = layer.getAllFeatures();
                    let pts = [];
                    let gdpData = getGdpData();
                    let dataMap = new Map();
                    gdpData.forEach(el => dataMap.set(el.Country, el));
                    features.forEach(f => {
                        let rect = map.layers[0].getGeoBBox(f);
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
                    map.layers[1].itemsSource = pts;
                },
                style: { fill: 'rgba(153,216,201,1)', stroke: 'white' }
            }),
            new ScatterMapLayer({
                binding: 'x,y,gdp',
                symbolMaxSize: 20,
                symbolMinSize: 5,
                style: { fill: 'rgba(44,162,95,1)', strokeWidth: 0.5 }
            })
        ]
    });
}
