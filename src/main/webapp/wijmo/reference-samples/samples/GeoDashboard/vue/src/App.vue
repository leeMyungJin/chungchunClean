<template>
  <div id="app">
    <div class="container">
      <div class="map">
        <div class="search">
          <button
            class="btn search-location"
            type="button"
            title="Go to current location"
            @click="gotoCurrentLocation()"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"
              />
            </svg>
          </button>
          <div class="control-group">
            <input
              class="control search-input"
              type="text"
              v-model="search"
              placeholder="Search for a location"
              @change="updateSearch()"
            />
            <div class="control-group-append">
              <button
                class="btn search-submit"
                type="button"
                title="Search for a location"
                :disabled="!searchEnabled"
                @click="geoCode()"
              >Find</button>
            </div>
          </div>
        </div>

        <!-- map with cross-hairs -->
        <EsriMap v-model="extent" :source="source">
          <EsriCrosshair color="rgba(255, 255, 255, 0.7)" :palette="palette" />
        </EsriMap>

        <div class="legend">
          <!-- legend info for the selected source of the map -->
          <EsriLegend class="legend-list" :source="source"></EsriLegend>
          <select class="control legend-select" v-model="currentLegend" :change="selectSource()">
            <option disabled value="none" hidden>Map Legend</option>
            <option
              v-for="entity in legend"
              :key="entity.value"
              :value="entity.value"
            >{{entity.name}}</option>
          </select>
        </div>
      </div>

      <div class="data">
        <div class="row" v-if="location" v-show="!location.isValid">
          <div class="group">
            <div class="group-title">No data is available for this location</div>
            <div
              class="group-subtitle"
            >Please drag the map to select a mainland location within the USA.</div>
          </div>
          <div>
            <ul class="locations">
              <li
                v-for="entity in locations"
                :key="entity.city"
                class="locations-item"
                v-on:click="geoCode(entity.city)"
              >
                <span class="locations-city">{{entity.city}}</span>
                <span class="locations-state">{{entity.state}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="data-group" v-if="location" v-show="location.isValid">
            <div class="group">
              <div class="group-title">{{location.name}}</div>
              <div
                class="group-description"
              >{{`The dominant tapestry is ${sources.tapestry.values.TAPSEGNAM.value}. ${domTapDescription}`}}</div>
            </div>

            <wj-tab-panel :selectedIndex="0">
              <wj-tab>
                <a href="#">Demographics</a>
                <div>
                  <div class="data-col">
                    <GdashTile
                      icon="<path d='M7.5,2A2,2 0 0,1 9.5,4A2,2 0 0,1 7.5,6A2,2 0 0,1 5.5,4A2,2 0 0,1 7.5,2M6,7H9A2,2 0 0,1 11,9V14.5H9.5V22H5.5V14.5H4V9A2,2 0 0,1 6,7M16.5,2A2,2 0 0,1 18.5,4A2,2 0 0,1 16.5,6A2,2 0 0,1 14.5,4A2,2 0 0,1 16.5,2M15,22V16H12L14.59,8.41C14.84,7.59 15.6,7 16.5,7C17.4,7 18.16,7.59 18.41,8.41L21,16H18V22H15Z' />"
                      header="Population by Sex"
                    >
                      <div class="tile-description">
                        Total Population:
                        <b>{{sources.populationBySex.values.TOTPOP_CY.value | format('n0')}}</b>
                      </div>
                      <div class="tile-chart">
                        <div class="flex-row">
                          <div class="flex-col">
                            <svg width="48" height="48" viewBox="0 0 24 24" :fill="palette[0]">
                              <path
                                d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,22V16H7.5L10.09,8.41C10.34,7.59 11.1,7 12,7C12.9,7 13.66,7.59 13.91,8.41L16.5,16H13.5V22H10.5Z"
                              />
                            </svg>
                            <div>Female:</div>
                            <div>{{sources.populationBySex.values.FEMALES_CY.value | format('n0')}}</div>
                          </div>
                          <div class="flex-col">
                            <wj-flex-pie
                              class="chart chart-pie"
                              bindingName="label"
                              binding="value"
                              :innerRadius="0.5"
                              :palette="palette"
                              :itemsSource="getPopulationData()"
                            >
                              <wj-flex-pie-data-label
                                position="Inside"
                                content="{value}%"
                                :offset="10"
                              />
                              <wj-flex-chart-legend position="None" />
                              <wj-flex-chart-animation />
                            </wj-flex-pie>
                          </div>
                          <div class="flex-col">
                            <svg width="48" height="48" viewBox="0 0 24 24" :fill="palette[1]">
                              <path
                                d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A2,2 0 0,1 15.5,9V14.5H14V22H10V14.5H8.5V9A2,2 0 0,1 10.5,7Z"
                              />
                            </svg>
                            <div>Male:</div>
                            <div>{{sources.populationBySex.values.MALES_CY.value | format('n0')}}</div>
                          </div>
                        </div>
                      </div>
                    </GdashTile>
                  </div>
                  <div class="data-col">
                    <GdashTile
                      icon="<path d='M16 9C22 9 22 13 22 13V15H16V13C16 13 16 11.31 14.85 9.8C14.68 9.57 14.47 9.35 14.25 9.14C14.77 9.06 15.34 9 16 9M2 13C2 13 2 9 8 9S14 13 14 13V15H2V13M9 17V19H15V17L18 20L15 23V21H9V23L6 20L9 17M8 1C6.34 1 5 2.34 5 4S6.34 7 8 7 11 5.66 11 4 9.66 1 8 1M16 1C14.34 1 13 2.34 13 4S14.34 7 16 7 19 5.66 19 4 17.66 1 16 1Z' />"
                      header="Median Age"
                    >
                      <div class="tile-description">
                        The median age is
                        <b>{{sources.age.values.MEDAGE_CY.value | format('n1')}} years</b>
                      </div>
                      <wj-flex-chart
                        ref="medianAgeChart"
                        class="chart chart-median"
                        plotMargin="40 0 60 0"
                        tooltipContent="{y} people <br/> are {x}"
                        chartType="Column"
                        bindingX="name"
                        :itemsSource="sources.age.shortList"
                        :palette="palette"
                      >
                        <wj-flex-chart-axis
                          wjProperty="axisX"
                          majorTickMarks="None"
                          :majorGrid="false"
                          :axisLine="true"
                          :labels="true"
                        />
                        <wj-flex-chart-axis wjProperty="axisY" position="None" />
                        <wj-flex-chart-data-label
                          position="Top"
                          content="{y}"
                          :offset="10"
                          :border="true"
                          :connectingLine="true"
                        />
                        <wj-flex-chart-animation />
                      </wj-flex-chart>
                    </GdashTile>
                  </div>
                </div>
              </wj-tab>
              <wj-tab>
                <a href="#">Affluence</a>
                <div>
                  <div class="data-col">
                    <GdashTile
                      icon="<path d='M20,18H4V6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M11,17H13V16H14A1,1 0 0,0 15,15V12A1,1 0 0,0 14,11H11V10H15V8H13V7H11V8H10A1,1 0 0,0 9,9V12A1,1 0 0,0 10,13H13V14H9V16H11V17Z' />"
                      header="Median Household Net Worth"
                    >
                      <div class="tile-description">
                        <p>
                          The median net worth is
                          <b>{{sources.netWorth.values.MEDNW_CY.value | format('c0')}}</b>
                        </p>
                      </div>
                      <div class="tile-chart">
                        <wj-linear-gauge
                          class="gauge gauge-linear"
                          :min="0"
                          :max="300000"
                          :value="sources.netWorth.values.MEDNW_CY.value"
                          :showTicks="true"
                          :showRanges="false"
                          :tickSpacing="50000"
                        >
                          <wj-range :min="0" :max="300000" :color="palette[0]" />
                        </wj-linear-gauge>
                      </div>
                    </GdashTile>
                  </div>
                  <div class="data-col">
                    <GdashTile
                      icon="<path d='M12,3L22,12H19V20H5V12H2L12,3M9.22,8.93C8.75,9.4 8.5,10.03 8.5,10.75C8.5,12.43 10.54,13.07 11.76,13.46C13.26,13.93 13.47,14.21 13.5,14.25C13.5,15 12.15,15 12,15V15C11.37,15 11.03,14.88 10.86,14.78C10.67,14.67 10.5,14.5 10.5,14H8.5C8.5,15.43 9.24,16.16 9.85,16.5C10.18,16.7 10.57,16.84 11,16.92V18H13V16.91C14.53,16.61 15.5,15.62 15.5,14.25C15.5,12.67 13.88,12.03 12.36,11.55C10.8,11.06 10.53,10.77 10.5,10.75C10.5,10.5 10.57,10.41 10.64,10.34C10.85,10.13 11.36,10 12,10V10C12.68,10 13.5,10.13 13.5,10.75H15.5C15.5,9.34 14.56,8.37 13,8.09V7H11V8.08C10.26,8.21 9.65,8.5 9.22,8.93Z' />"
                      header="Home Values"
                    >
                      <div>
                        <div class="tile-description">
                          <b>{{sources.homeValue.values.NAME.value}}'s</b> median home value is &nbsp;
                          <b>{{sources.homeValue.values.MEDVAL_CY.value | format('c0')}}</b>
                          ({{getIndexDescription(sources.homeValue.values.MEDVAL_I.value)}}).
                        </div>
                        <table>
                          <tbody>
                            <tr>
                              <td>Home Value Index</td>
                              <td>
                                <GdashSlider
                                  :value="sources.homeValue.values.MEDVAL_I.value"
                                  :palette="palette"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Household Income Index</td>
                              <td>
                                <GdashSlider
                                  :value="sources.homeValue.values.MEDHINC_I.value"
                                  :palette="palette"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Net Worth Index</td>
                              <td>
                                <GdashSlider
                                  :value="sources.homeValue.values.MEDNW_I.value"
                                  :palette="palette"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="tile-chart">
                          <div class="btn-group btn-group-toggle">
                            <label v-bind:class="{ btn: true, active: !detailed }">
                              <input type="radio" v-bind:value="false" v-model="detailed" />
                              Summary
                            </label>
                            <label v-bind:class="{ btn: true, active: detailed }">
                              <input type="radio" v-bind:value="true" v-model="detailed" />
                              Details
                            </label>
                          </div>
                          <div>
                            <wj-flex-chart
                              ref="homeValueDistributionChart"
                              style="height: 350px"
                              class="chart chart-bar"
                              chartType="Bar"
                              v-show="detailed"
                              plotMargin="10 50 10 130"
                              tooltipContent="{y} people <br/> are {x}"
                              :itemsSource="sources.homeValue.list"
                              :palette="palette"
                            >
                              <wj-flex-chart-axis
                                wjProperty="axisX"
                                :axisLine="false"
                                :majorGrid="false"
                                :labels="false"
                              />
                              <wj-flex-chart-axis
                                wjProperty="axisY"
                                :majorGrid="false"
                                :axisLine="true"
                                :labels="true"
                              />
                              <wj-flex-chart-data-label
                                content="{y}"
                                position="Right"
                                :border="true"
                                :connectingLine="true"
                                :offset="6"
                              />
                              <wj-flex-chart-animation />
                            </wj-flex-chart>

                            <wj-flex-chart
                              ref="homeValueChart"
                              class="chart chart-bar"
                              v-show="!detailed"
                              chartType="Bar"
                              bindingX="name"
                              tooltipContent="{y} homes in the <br/>{x} range"
                              :itemsSource="sources.homeValue.shortList"
                              :palette="palette"
                            >
                              <wj-flex-chart-axis
                                wjProperty="axisX"
                                majorTickMarks="None"
                                :majorGrid="true"
                                :axisLine="false"
                                :labels="false"
                              />
                              <wj-flex-chart-axis wjProperty="axisY" :majorGrid="false" />
                            </wj-flex-chart>
                          </div>
                        </div>
                      </div>
                    </GdashTile>
                  </div>
                  <div class="data-col">
                    <GdashTile
                      icon="<path d='M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z' />"
                      header="Household Income"
                    >
                      <div class="tile-description">
                        The average income is
                        <b>{{sources.householdIncome.values.MEDHINC_CY.value | format('c0')}}</b>
                      </div>
                      <wj-flex-chart
                        class="chart chart-bar-stacked"
                        chartType="Bar"
                        stacking="Stacked100pc"
                        :itemsSource="getStackedHouseholdIncome()"
                        :palette="palette"
                      >
                        <wj-flex-chart-axis wjProperty="axisY" position="None" />
                        <wj-flex-chart-axis wjProperty="axisX" position="None" />
                        <wj-flex-chart-data-label content="{y}" position="Left" :offset="10" />
                        <wj-flex-chart-series name="Under 75k" binding="0" />
                        <wj-flex-chart-series name="75k to 150k" binding="1" />
                        <wj-flex-chart-series name="150k and above" binding="2" />
                        <wj-flex-chart-legend position="Bottom" />
                      </wj-flex-chart>
                    </GdashTile>
                  </div>
                </div>
              </wj-tab>
            </wj-tab-panel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';

import esriLoader from 'esriLoader';
import google from 'google';

import * as wjcCore from '@grapecity/wijmo';
import * as wjcChart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.vue2.chart';
import '@grapecity/wijmo.vue2.gauge';
import '@grapecity/wijmo.vue2.nav';
import '@grapecity/wijmo.vue2.chart.animation';

import EsriMap from './components/EsriMap.vue';
import EsriCrosshair from './components/EsriCrosshair.vue';
import EsriLegend from './components/EsriLegend.vue';
import GdashTile from './components/GdashTile.vue';
import GdashSlider from './components/GdashSlider.vue';
import DashService from './services/DashService';

export default {
  name: 'app',
  components: {
    GdashTile,
    GdashSlider,
    EsriMap,
    EsriCrosshair,
    EsriLegend,
  },
  data: function() {
    return {
      palette: ['#00b075', '#f8ce45', '#ecf0ee'],
      currentLegend: 'none',
      legend: [
        { name: 'None', value: 'none' },
        { name: 'Median Age', value: 'age' },
        { name: 'Home Value', value: 'homeValue' },
        { name: 'Household Income', value: 'householdIncome' },
        { name: 'Net Worth', value: 'netWorth' },
        { name: 'Population', value: 'populationBySex' },
        { name: 'Tapestry', value: 'tapestry' },
      ],
      extent: null,
      source: null,
      location: null, // current map location (lat, lon, name, read only)
      locations: [
        { city: 'New York', state: 'New York' },
        { city: 'Los Angeles', state: 'California' },
        { city: 'Chicago', state: 'Illinois' },
        { city: 'Houston', state: 'Texas' },
        { city: 'Phoenix', state: 'Arizona' },
      ],
      search: '', // geocode a location
      domTapDescription: '', // current map tapestry description
      detailed: false,
      searchEnabled: false,
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    extent: function(newValue, oldValue) {
      this.gdashService.setExtent(newValue);
    },
    detailed: function (val) {
      this.detailed = val;
      this.updateCharts();
    },
  },
  beforeCreate() {
    this.gdashService = new DashService();

    // configures esri-loader to load ArcGIS API and styles of specified version
    esriLoader.setDefaultOptions({
      version: '4.14',
      css: true,
    });
  },
  created() {
    this.updateCharts = this.updateCharts.bind(this);
  },
  mounted() {
    this.gdashService
      .initService(this.onGotData.bind(this))
      .then(() => this.gdashService.getLocation())
      .then(location => {
        this.sources = this.gdashService.getSources();
        this.location = location;
      });
  },
  methods: {
    getIndexDescription: function(index) {
      return this.gdashService.getIndexDescription(index);
    },
    selectSource: function() {
      if (this.currentLegend === 'none') {
        this.source = null;
      } else if (this.currentLegend !== this.source) {
        for (const key of Object.keys(this.sources)) {
          const isCurrentSource = key === this.currentLegend;
          this.sources[key].selected = isCurrentSource;
          if (isCurrentSource) this.source = this.sources[key];
        }
      }
    },
    gotoCurrentLocation: function() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const c = position.coords;
          this.gotoLocation(c.longitude, c.latitude);
        });
        return true;
      }
      return false;
    },
    gotoLocation: function(lon, lat) {
      return esriLoader
        .loadModules(['esri/geometry/Point', 'esri/geometry/support/webMercatorUtils'])
        .then(([Point, webMercatorUtils]) => {
          let extent = this.extent.clone();
          const [x, y] = webMercatorUtils.lngLatToXY(lon, lat);
          const point = new Point({ x, y, z: extent.z });
          extent = extent.centerAt(point);
          this.extent = extent;
        });
    },
    getStackedHouseholdIncome: function() {
      return this.sources.householdIncome.shortList.reduce(
        (obj, item, idx) => {
          obj[0][idx] = item.value;
          return obj;
        },
        [{}],
      );
    },
    getPopulationData: function() {
      return [
        {
          label: 'Female',
          value: `${wjcCore.Globalize.format(this.sources.populationBySex.values.PFEMALE_CY.value, 'n0')}%`,
        },
        {
          label: 'Male',
          value: `${wjcCore.Globalize.format(this.sources.populationBySex.values.PMALE_CY.value, 'n0')}%`,
        },
      ];
    },
    geoCode: function(search) {
      if (search || this.searchEnabled) {
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
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
    },
    onGotData: function() {
      this.gdashService.getLocation().then(location => {
        this.location = location;
        this.domTapDescription = this.gdashService.getDomTapDescription();
        window.setTimeout(this.updateCharts, 0);
      });
    },
    updateSearch: function(value) {
      if (value) this.search = value;
      this.searchEnabled = this.search && this.search.length > 0;
    },
    updateCharts: function() {
      this.updateChart(this.$refs.medianAgeChart.control);
      this.updateChart(this.$refs.homeValueChart.control);
      this.updateChart(this.$refs.homeValueDistributionChart.control);
    },
    updateChart: function(chart) {
      if (!chart) return;
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
    },
  },
  filters: {
    format(value, format) {
      return wjcCore.Globalize.format(value, format);
    },
  },
};
</script>

<style>
/* app */
*,
::after,
::before {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  margin: 0;
}

body {
  color: #7e8989;
  font-family: -apple-system-font, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: -apple-system-font, 'Segoe UI Light', 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 300;
}

b {
  font-weight: 500;
  color: black;
}

[type='button']:not(:disabled),
button:not(:disabled) {
  cursor: pointer;
}

#app {
  flex: 1 1 auto;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
@media only screen and (max-width: 900px) {
  .container {
    flex-direction: column;
  }
}

.map {
  position: relative;
  flex: 1 1 60%;
  cursor: move;
  background: #cfd3d4;
}
@media only screen and (max-width: 900px) {
  .map {
    flex: 1 1 30%;
    min-height: 180px;
  }
}

.locations {
  list-style: none;
  padding: 0 2rem;
  margin: 0;
}

.locations-item {
  cursor: pointer;
  padding-bottom: 0.75rem;
}

.locations-city {
  color: #14a071;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 0.75rem;
}

.legend {
  position: absolute;
  bottom: 3rem;
  z-index: 1;
  left: 2rem;
  width: 210px;
  font-size: 0.875rem;
}
@media only screen and (max-width: 900px) {
  .legend {
    top: auto;
    bottom: 0;
    left: auto;
    right: auto;
    width: 100%;
    z-index: 2;
  }
}

.legend .legend-list {
  background: rgba(56, 60, 58, 0.9);
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
  color: #cecece;
}
@media only screen and (max-width: 900px) {
  .legend .legend-list {
    padding: 0.5rem;
    position: absolute;
    top: 32px;
    width: 100%;
    border-radius: 0;
  }
}

.legend .legend-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.legend .legend-item:not(:last-child) {
  margin-bottom: 0.5rem;
}

.legend .legend-select {
  font-size: inherit;
}
@media only screen and (max-width: 900px) {
  .legend .legend-select {
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background: rgba(255, 255, 255, 0.5);
  }
  .legend .legend-select:focus {
    outline: none;
  }
}

.data {
  position: relative;
  flex: 1 1 40%;
  overflow: auto;
  max-width: 600px;
  min-width: 500px;
  box-shadow: 0 0 3px -2px rgba(0, 0, 0, 0.2), 0 0 4px 0 rgba(0, 0, 0, 0.14), 0 0 8px 0 rgba(0, 0, 0, 0.12);
}
@media only screen and (max-width: 900px) {
  .data {
    flex: 1 1 70%;
    min-width: auto;
    max-width: 100%;
  }
}

.data::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.data::-webkit-scrollbar-track {
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.1);
}
.data::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.2);
}
.data::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}
.data::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.9);
}

.data .data-row {
  display: flex;
  flex-direction: row;
}

.data .data-col {
  flex: 1 1 auto;
}

.group {
  padding: 2rem;
}

.group-title {
  color: black;
  font-size: 1.625rem;
  margin-bottom: 0.5rem;
}

.group-subtitle {
  color: #696969;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.group-description {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.search {
  position: absolute;
  display: flex;
  flex-direction: row;
  z-index: 1;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
}
@media only screen and (max-width: 900px) {
  .search {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

.search .search-location {
  min-width: 3.75rem;
  margin-right: 0.75rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #4cc89d;
  color: #ffffff;
}

.search .search-input {
  font-size: inherit;
  height: auto;
}

.search .search-submit {
  font-size: inherit;
  color: #6c757d;
  border-color: #6c757d;
  background: white;
}

.search .search-submit:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.search .search-submit:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.header {
  background-color: #00c1d5;
  background-position: 0 0;
  background-repeat: repeat-x;
  margin-bottom: 14px;
  padding: 12px 0px;
  color: #dcf3f6;
}

.header h1 {
  font-size: 40px;
  line-height: 1;
  margin-top: 0;
  color: #fff;
}

.header a {
  font-weight: bold;
  color: #dcf3f6;
}

/* information tiles */
.tile {
  padding: 2rem;
  font-size: 0.875rem;
}

.tile .tile-content {
  width: 100%;
}

.tile .tile-header {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tile .tile-header svg {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  margin-right: 0.375rem;
}

.tile .tile-description {
  margin: 0.75rem 0 0;
  line-height: 1.5;
}

.tile .tile-chart {
  margin-top: 2.25rem;
}

.tile table {
  margin-top: 1.5rem;
  width: 100%;
  font-weight: 300;
}

.tile table tr td:last-child {
  width: 60%;
  color: black;
}

/* background images */
.symbol {
  width: 80px;
  height: 80px;
  text-align: center;
  background-repeat: no-repeat;
}

.chart {
  width: 100%;
  border: none;
  margin: 1.5rem 0 0;
  padding: 0;
  box-sizing: content-box;
}

.chart.chart-column {
  height: 240px;
}

.chart.chart-median {
  height: 240px;
}

.chart.chart-pie {
  border: none;
  max-width: 190px;
  max-height: 190px;
  margin: 0;
  padding: 0;
}

.chart.chart-bar {
  height: 160px;
  border: 1px solid #eee;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
}

.chart.chart-bar-stacked {
  height: 120px;
}

.gauge.gauge-linear {
  height: 0.75rem;
  font-size: 1rem;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: inherit;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  color: inherit;
  background-color: transparent;
  border-color: #d8dfe1;
  min-width: 6rem;
}

.btn:not(:disabled):not(.disabled).active,
.btn:not(:disabled):not(.disabled):active {
  color: #14a071;
  background-color: #d2f1e7;
  border-color: #d2f1e7;
  cursor: default;
}

.btn-group {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.btn-group > .btn {
  position: relative;
  flex: 1 1 auto;
}

.btn-group > .btn-group:not(:last-child) > .btn,
.btn-group > .btn:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-group > .btn-group:not(:first-child) > .btn,
.btn-group > .btn:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.btn-group > .btn-group:not(:first-child),
.btn-group > .btn:not(:first-child) {
  margin-left: -1px;
}

.btn-group-toggle > .btn,
.btn-group-toggle > .btn-group > .btn {
  margin-bottom: 0;
}

.btn-group-toggle > .btn input[type='radio'],
.btn-group-toggle > .btn-group > .btn input[type='radio'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  box-sizing: border-box;
  padding: 0;
}

.control-group {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}

.control-group-append {
  display: flex;
  margin-left: -1px;
}

.control-group-append .btn {
  position: relative;
  z-index: 2;
}

.control-group > .control-group-append > .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.control-group > .control:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.control-group > .control:focus {
  z-index: 3;
}

.control-group > .control {
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  margin-bottom: 0;
}

.control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.control::focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.crosshair {
  position: absolute;
  pointer-events: none;
}

.esri-map {
  display: block;
  position: relative;
  height: 100%;
}

.esri-view .esri-view-surface {
  outline: none;
}

.esri-component.esri-zoom {
  position: absolute;
  top: 100px;
  left: 18px;
}
@media only screen and (max-width: 900px) {
  .esri-component.esri-zoom {
    left: 0;
    top: 60px
  }
}

.esri-view .esri-view-surface--inset-outline:focus::after {
  display: none;
}

.wj-control {
  color: inherit;
  background: inherit;
}

.wj-flexchart {
  display: block;
}

.wj-gauge .wj-min,
.wj-gauge .wj-max,
.wj-gauge .wj-tick-text text {
  font-size: 0.75em;
  opacity: 0.5;
}

.wj-gauge .wj-ticks {
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.8);
}

.wj-gauge .wj-face path {
  stroke: none;
}

.wj-tabheaders {
  margin: 0 1px;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #ddd;
  z-index: 1;
}

.wj-tabpanel > div > .wj-tabpanes {
  border-top: none;
}

.wj-tabpanel > div > .wj-tabheaders > .wj-tabheader.wj-state-active {
  border-color: #ddd;
  border-bottom-color: transparent;
  color: black;
}

.wj-tabpanel > div > .wj-tabheaders > .wj-tabheader {
  top: 1px;
  border: 1px solid transparent;
  border-radius: 0.25rem 0.25rem 0 0;
  padding: 0.75rem 1rem;
  text-transform: none;
  font-weight: 500;
}
@media only screen and (max-width: 900px) {
  .wj-tabpanel > div > .wj-tabheaders > .wj-tabheader {
    padding: 0.5rem;
  }
}


.wj-tabpanel > div > .wj-tabheaders > .wj-tabheader:after {
  display: none;
}

div[style*='position: fixed; display: block; visibility: visible;'] {
  font-size: 0.75rem !important;
}


@media only screen and (max-width: 900px) {
  .universal-nav {
    white-space: nowrap;
  }
}

</style>