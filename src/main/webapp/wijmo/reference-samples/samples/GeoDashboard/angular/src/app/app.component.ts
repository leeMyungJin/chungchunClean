declare var esriLoader: any;
declare var google: any;

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcChart from '@grapecity/wijmo.chart';
import { DashService } from './services/dash.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    search = '';                      // geocode a location
    searchEnabled = false;
    location = null;                  // current map location (lat, lon, name, read only)
    domTapDescription = '';           // current map tapestry description
    selectedSource = null;            // tiles for a given info source
    source: null;
    sources: any = {};                // information sources for the tiles
    currentLegend: 'none';
    detailed = false;
    palette = ['#00b075', '#f8ce45', '#ecf0ee'];
    legend = [
      { name: 'None', value: 'none' },
      { name: 'Median Age', value: 'age' },
      { name: 'Home Value', value: 'homeValue' },
      { name: 'Household Income', value: 'householdIncome' },
      { name: 'Net Worth', value: 'netWorth' },
      { name: 'Population', value: 'populationBySex' },
      { name: 'Tapestry', value: 'tapestry' },
    ];
    locations = [
      { city: 'New York', state: 'New York' },
      { city: 'Los Angeles', state: 'California' },
      { city: 'Chicago', state: 'Illinois' },
      { city: 'Houston', state: 'Texas' },
      { city: 'Phoenix', state: 'Arizona' },
    ];

    @ViewChild('medianAgeChart', { static: false }) medianAgeChart: wjcChart.FlexChart;
    @ViewChild('homeValueChart', { static: false }) homeValueChart: wjcChart.FlexChart;
    @ViewChild('homeValueDistributionChart', { static: false }) homeValueDistributionChart: wjcChart.FlexChart;

    private geocoder: any;
    private gdashService: DashService;

    constructor(@Inject(DashService) gdashService: DashService) {
        this.gdashService = gdashService;
        // configures esri-loader to load ArcGIS API and styles of specified version
        esriLoader.setDefaultOptions({ version: '4.14', css: true });
    }

    ngOnInit() {
      this.gdashService.initService(this.onGotData.bind(this))
        .then(() => this.gdashService.getLocation())
        .then((location) => {
            this.sources = this.gdashService.getSources();
            this.extent = this.gdashService.getExtent();
            this.location = location;
        });
    }

    get extent(): any {
        return this.gdashService.getExtent();
    }
    set extent(value: any) {
        this.gdashService.setExtent(value);
    }

    get isDetailed() {
      return this.detailed;
    }

    set isDetailed(val) {
      this.detailed = val;
      this.updateCharts();
    }

    // get a description for an index (100 is the national average, 50 is half, 200 is double, etc)
    getIndexDescription(index: number) {
        return this.gdashService.getIndexDescription(index);
    }

    // show tiles for a given info source
    selectSource() {
      if (this.currentLegend === 'none') {
        this.source = null;
      } else if (this.currentLegend !== this.source) {
        for (const key of Object.keys(this.sources)) {
          const isCurrentSource = key === this.currentLegend;
          this.sources[key].selected = isCurrentSource;
          if (isCurrentSource) {
            this.source = this.sources[key];
          }
        }
      }
    }

    // go to the current location
    gotoCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const c = position.coords;
                this.gotoLocation(c.longitude, c.latitude);
            });
            return true;
        }
        return false;
    }

    // go to any location
    gotoLocation(lon: number, lat: number): Promise<void> {
        return esriLoader.loadModules([
            'esri/geometry/Point',
            'esri/geometry/support/webMercatorUtils'
        ]).then(([Point, webMercatorUtils]) => {
            const clone = this.extent.clone();
            const [x, y] = webMercatorUtils.lngLatToXY(lon, lat);
            const point = new Point({x, y, z: clone.z});
            this.extent = clone.centerAt(point);
        });
    }

    // geocode a location
    geoCode(search?) {
      if (search || this.search || this.searchEnabled) {
        if (!this.geocoder) {
          this.geocoder = new google.maps.Geocoder();
        }
        const searchTerm = search || this.search;
        this.geocoder.geocode({ address: searchTerm }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const loc = results[0].geometry.location;
            this.gotoLocation(loc.lng(), loc.lat());
            this.updateSearch('');
          } else {
            alert('Sorry, this search produced no results.');
          }
        });
      }
    }

    updateSearch(value) {
      if (value) {
        this.search = value;
      }
      this.searchEnabled = this.search && this.search.length > 0;
    }

    updateCharts() {
      this.updateChart(this.medianAgeChart);
      this.updateChart(this.homeValueChart);
      this.updateChart(this.homeValueDistributionChart);
    }

    private onGotData() {
      this.gdashService.getLocation().then((location) => {
        this.location = location;
        this.domTapDescription = this.gdashService.getDomTapDescription();
        window.setTimeout(() => this.updateCharts(), 0);
      });
    }

    private updateChart(chart: wjcChart.FlexChart) {
      if (!chart) {
        return;
      }
      chart.beginUpdate();
      try {
        chart.series.clear();
        const valueSeries = new wjcChart.Series();
        valueSeries.binding = 'value';
        valueSeries.style = {};
        chart.bindingX = 'name';
        chart.series.push(valueSeries);
      } finally {
        chart.endUpdate();
      }
    }
}
