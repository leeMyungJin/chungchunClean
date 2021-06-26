declare var esriLoader: any;

import { Component, EventEmitter, Inject, ElementRef, Input, Output } from '@angular/core';
import { DashService } from '../services/dash.service';

@Component({
    selector: 'app-esri-map',
    template: '<div><ng-content></ng-content></div>'
})
export class EsriMapComponent {
    private _mapView = null;
    private _tileSource: any;

    constructor(@Inject(ElementRef) elRef: ElementRef) {
        this._createMap(elRef.nativeElement);
    }

    @Output()
    extentChange = new EventEmitter<any>();

    @Input()
    get extent(): any {
        if (!this._mapView) {
            return;
        }
        return this._mapView.extent;
    }
    set extent(value: any) {
        if (!this._mapView) {
            return;
        }
        this._mapView.extent = value;
    }

    @Input()
    get tileSource(): any {
        return this._tileSource;
    }
    set tileSource(source: any) {
        if (!this._mapView) {
            return;
        }
        this._tileSource = source;
        if (source) {
            this._showTiles(source);
        } else {
            const map = this._mapView.map;
            map.layers.forEach((layer) => {
                layer.visible = false;
            });
        }
    }

    // create the map
    private _createMap(element: HTMLElement): Promise<void> {
        return esriLoader.loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Extent',
            'esri/core/watchUtils'
        ]).then(([Map, MapView, Extent, watchUtils]) => {
            // give element a unique id
            let elementId = element.id;
            if (!elementId) {
                elementId = 'map' + DashService.MAPID++;
                element.id = elementId;
            }

            // create the map
            const options = {
                basemap: 'gray-vector'
            };
            const map = new Map(options);

            const extent = new Extent({
                xmin: -10392864, ymin: 4444140,
                xmax: -7423438, ymax: 5422534,
                spatialReference: { wkid: 102100 }
            });

            const mapView = new MapView({
                map,
                container: elementId,
                extent
            });

            // disable zoom on mouse wheel
            mapView.navigation.mouseWheelZoomEnabled = false;

            // don't show attribution
            mapView.ui.remove("attribution");

            this._mapView = mapView;

            // here is used the recommended way how to detect extent changes
            // as in ArcGIS "Watch for changes" sample:
            // https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html
            watchUtils.whenTrue(mapView, "stationary", () => this._handleMapStationaryChanged());
        });
    }

    // handle map stationary changes after user zooms or pans the map
    private _handleMapStationaryChanged() {
        this.extentChange.emit(this._mapView.extent);
    }

    // show tile layer
    private _showTiles(source: any) {
        esriLoader.loadModules(["esri/layers/TileLayer"]).then(([TileLayer]) => {
            const map = this._mapView.map;

            // get tile url
            const url = source ? source.getTileUrl() : '';

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
                layer.visible = (layer.id === url);
            });
        });
    }
}
