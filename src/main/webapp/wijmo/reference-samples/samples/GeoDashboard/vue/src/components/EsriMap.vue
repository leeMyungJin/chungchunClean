<template>
  <div class="esri-map">
    <slot></slot>
  </div>
</template>

<script>
import esriLoader from 'esriLoader';

export default {
  name: 'EsriMap',
  model: {
    prop: 'extent',
    event: 'extentChange'
  },
  props: {
    extent: Object,
    source: Object
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    extent: function(newValue, oldValue) {
      this.mapView.extent = newValue;
    },
    // eslint-disable-next-line no-unused-vars
    source: function(newValue, oldValue) {
      if (newValue) {
        this.showTiles(newValue);
      } else {
        this.hideTiles();
      }
    }
  },
  mounted() {
    esriLoader.loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/geometry/Extent',
      'esri/core/watchUtils'
    ]).then(([Map, MapView, Extent, watchUtils]) => {

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
        container: this.$el,
        map,
        extent
      });

      // disable zoom on mouse wheel
      mapView.navigation.mouseWheelZoomEnabled = false;

      // don't show attribution
      mapView.ui.remove("attribution");

      this.mapView = mapView;

      // here is used the recommended way how to detect extent changes
      // as in ArcGIS "Watch for changes" sample:
      // https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html
      watchUtils.whenTrue(mapView, "stationary", this.handleMapStationaryChanged.bind(this));
    });
  },
  beforeDestroy() {
    if (this.mapView) {
      // destroy the map view
      this.mapView.container = null;
    }
  },
  methods: {
    showTiles: function(tileSource) {
      esriLoader.loadModules(["esri/layers/TileLayer"]).then(([TileLayer]) => {
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
            layer.visible = (layer.id === url);
        });
      });
    },
    hideTiles: function() {
      const map = this.mapView.map;
      map.layers.forEach((layer) => {
          layer.visible = false;
      });
    },
    // handle map stationary changes after user zooms or pans the map
    handleMapStationaryChanged: function() {
      this.$emit('extentChange', this.mapView.extent);
    }
  }
};
</script>