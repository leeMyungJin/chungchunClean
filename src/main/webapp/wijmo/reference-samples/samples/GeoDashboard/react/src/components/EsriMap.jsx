// React
import * as React from 'react';
export class EsriMap extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }
    componentDidMount() {
        esriLoader
            .loadModules(['esri/Map', 'esri/views/MapView', 'esri/geometry/Extent', 'esri/core/watchUtils'])
            .then(([Map, MapView, Extent, watchUtils]) => {
            // create the map
            const options = { basemap: 'gray-vector' };
            const map = new Map(options);
            const extent = new Extent({
                xmin: -10392864,
                ymin: 4444140,
                xmax: -7423438,
                ymax: 5422534,
                spatialReference: { wkid: 102100 },
            });
            const mapView = new MapView({
                map,
                container: this.mapRef.current,
                extent,
            });
            // disable zoom on mouse wheel
            mapView.navigation.mouseWheelZoomEnabled = false;
            // don't show attribution
            mapView.ui.remove('attribution');
            this.mapView = mapView;
            // here is used the recommended way how to detect extent changes
            // as in ArcGIS "Watch for changes" sample:
            // https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html
            watchUtils.whenTrue(mapView, 'stationary', () => this.handleMapStationaryChanged());
        });
    }
    componentWillUnmount() {
        if (this.mapView) {
            // destroy the map view
            this.mapView.container = null;
        }
    }
    render() {
        return (<div className="esri-map" style={this.props.style} ref={this.mapRef}>
        {this.props.children}
      </div>);
    }
    setExtent(value) {
        this.mapView.extent = value;
    }
    getTileSource() {
        return this.tileSource;
    }
    setTileSource(value) {
        if (value !== this.tileSource) {
            this.tileSource = value;
            this.updateTiles(this.tileSource);
        }
    }
    updateTiles(tileSource) {
        if (tileSource) {
            this.showTiles(tileSource);
        }
        else {
            this.hideTiles();
        }
    }
    showTiles(tileSource) {
        esriLoader.loadModules(['esri/layers/TileLayer']).then(([TileLayer]) => {
            const map = this.mapView.map;
            // get tile url
            const url = tileSource ? tileSource.getTileUrl() : '';
            // create new tile layer if necessary
            if (url) {
                let layer = map.findLayerById(url);
                if (!layer) {
                    layer = new TileLayer(url);
                    layer.id = url;
                    layer.opacity = 0.4;
                    map.layers.add(layer);
                }
            }
            // set tile layer visibility
            map.layers.forEach((layer) => {
                layer.visible = layer.id === url;
            });
        });
    }
    hideTiles() {
        const map = this.mapView.map;
        map.layers.forEach((layer) => {
            layer.visible = false;
        });
    }
    // handle map stationary changes after user zooms or pans the map
    handleMapStationaryChanged() {
        if (this.props.onExtentChange) {
            this.props.onExtentChange(this.mapView.extent);
        }
    }
}
