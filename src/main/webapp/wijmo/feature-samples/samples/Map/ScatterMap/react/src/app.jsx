import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexMap, GeoMapLayer, GeoGridLayer, ScatterMapLayer } from '@grapecity/wijmo.react.chart.map';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.zoomTo = (layer) => {
            layer.map.zoomTo(layer.getGeoBBox());
        };
    }
    ;
    render() {
        return <div className="container-fluid">
                            <FlexMap header="Airport Map" tooltipContent='&#9992; <b>{iata_code}</b><br>{name}'>
                                <GeoMapLayer url="data/land.json" style={{ fill: 'rgba(200,200,200,1)' }}></GeoMapLayer>
                                <ScatterMapLayer url="data/airports.json" style={{ fill: 'rgba(10,10,10,1)' }} binding="coordinates" itemsSourceChanged={this.zoomTo}></ScatterMapLayer>
                                <GeoGridLayer></GeoGridLayer>
                            </FlexMap>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
