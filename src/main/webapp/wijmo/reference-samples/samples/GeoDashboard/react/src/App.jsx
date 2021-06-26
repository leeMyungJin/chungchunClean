// React
import * as React from 'react';
// Wijmo
import * as wjcCore from '@grapecity/wijmo';
import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import { EsriMap } from './components/EsriMap';
import { EsriCrosshair } from './components/EsriCrosshair';
import { EsriLegend } from './components/EsriLegend';
import { GdashSlider } from './components/GdashSlider';
import { GdashTile } from './components/GdashTile';
import { DashService } from './services/DashService';
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.sources = []; // information sources for the tiles
        // geocode a location
        this.geoCode = (search) => {
            if (search || this.state.searchEnabled) {
                if (!this.geocoder)
                    this.geocoder = new google.maps.Geocoder();
                const searchTerm = search || this.state.search;
                this.geocoder.geocode({ address: searchTerm }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        const loc = results[0].geometry.location;
                        this.gotoLocation(loc.lng(), loc.lat());
                        this.updateSearch('');
                    }
                    else {
                        alert('Sorry, this search produced no results.');
                    }
                });
            }
        };
        this.state = {
            search: '',
            searchEnabled: false,
            location: null,
            detailed: false,
            domTapDescription: '',
            palette: ['#00b075', '#f8ce45', '#ecf0ee'],
        };
        this.gdashService = new DashService();
        this.mapRef = React.createRef();
        this.legendRef = React.createRef();
        this.medianAgeChartRef = React.createRef();
        this.homeValueChartRef = React.createRef();
        this.homeValueDistributionChartRef = React.createRef();
        // configures esri-loader to load ArcGIS API and styles of specified version
        esriLoader.setDefaultOptions({
            version: '4.14',
            css: true,
        });
    }
    componentDidMount() {
        this.gdashService
            .initService(this.onGotData.bind(this))
            .then(() => this.gdashService.getLocation())
            .then((location) => {
            this.sources = this.gdashService.getSources();
            this.setState({ location: location });
        });
    }
    componentDidUpdate(prevState) {
        if (this.state.detailed !== prevState.detailed) {
            this.updateCharts();
        }
    }
    // render the dashboard
    render() {
        const location = this.state.location;
        const sources = [
            { name: 'None', value: '' },
            { name: 'Median Age', value: 'age' },
            { name: 'Home Value', value: 'homeValue' },
            { name: 'Household Income', value: 'householdIncome' },
            { name: 'Net Worth', value: 'netWorth' },
            { name: 'Population', value: 'populationBySex' },
            { name: 'Tapestry', value: 'tapestry' },
        ];
        const locations = [
            { city: 'New York', state: 'New York' },
            { city: 'Los Angeles', state: 'California' },
            { city: 'Chicago', state: 'Illinois' },
            { city: 'Houston', state: 'Texas' },
            { city: 'Phoenix', state: 'Arizona' },
        ];
        return (<React.Fragment>
        <div className="container">
          <div className="map">
            <div className="search">
              <button className="btn search-location" type="button" title="Go to current location" onClick={this.gotoCurrentLocation.bind(this)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"/>
                </svg>
              </button>
              <div className="control-group">
                <input type="text" className="control search-input" placeholder="Search for a location" value={this.state.search} onChange={(e) => this.updateSearch(e.target.value)}/>
                <div className="control-group-append">
                  <button className="btn search-submit" type="button" title="Search for a location" disabled={!this.state.searchEnabled} onClick={() => this.geoCode()}>
                    Find
                  </button>
                </div>
              </div>
            </div>
            <EsriMap ref={this.mapRef} onExtentChange={this.handleExtentChange.bind(this)}>
              <EsriCrosshair color="rgba(255, 255, 255, 0.7)" bgColor={this.state.palette[0]}/>
            </EsriMap>
            <div className="legend">
              <EsriLegend className="legend-list" ref={this.legendRef}/>
              <select className="control legend-select" defaultValue="1" onChange={({ target }) => this.selectSource(this.sources[target.value])}>
                <option disabled value="1" hidden>
                  Map Legend
                </option>
                {sources.map((entity) => (<option key={`option_${entity.name}`} value={entity.value}>
                    {entity.name}
                  </option>))}
              </select>
            </div>
          </div>

          <div className="data">
            <div className="row" style={{ display: location && location.isValid ? 'none' : '' }}>
              <div className="group">
                <div className="group-title">No data is available for this location</div>
                <div className="group-subtitle">Please drag the map to select a mainland location within the USA.</div>
              </div>
              <div>
                <ul className="locations">
                  {locations.map((entity) => (<li key={`location_${entity.city}`} className="locations-item" onClick={() => this.geoCode(entity.city)}>
                      <span className="locations-city">{entity.city}</span>
                      <span className="locations-state">{entity.state}</span>
                    </li>))}
                </ul>
              </div>
            </div>
            <div className="row">{this.renderTiles()}</div>
          </div>
        </div>
      </React.Fragment>);
    }
    renderTiles() {
        const location = this.state.location;
        const { format } = wjcCore.Globalize;
        const { age, homeValue, householdIncome, netWorth, tapestry, populationBySex } = this.sources;
        const { detailed, domTapDescription } = this.state;
        if (!location)
            return null;
        const populationData = [
            {
                label: 'Female',
                value: `${format(populationBySex.values.PFEMALE_CY.value, 'n0')}%`,
            },
            {
                label: 'Male',
                value: `${format(populationBySex.values.PMALE_CY.value, 'n0')}%`,
            },
        ];
        const renderPopulationTile = (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M7.5,2A2,2 0 0,1 9.5,4A2,2 0 0,1 7.5,6A2,2 0 0,1 5.5,4A2,2 0 0,1 7.5,2M6,7H9A2,2 0 0,1 11,9V14.5H9.5V22H5.5V14.5H4V9A2,2 0 0,1 6,7M16.5,2A2,2 0 0,1 18.5,4A2,2 0 0,1 16.5,6A2,2 0 0,1 14.5,4A2,2 0 0,1 16.5,2M15,22V16H12L14.59,8.41C14.84,7.59 15.6,7 16.5,7C17.4,7 18.16,7.59 18.41,8.41L21,16H18V22H15Z"/>
          </svg>} header="Population by Sex">
        <div className="tile-description">
          Total Population: <b>{format(populationBySex.values.TOTPOP_CY.value, 'n0')}</b>
        </div>
        <div className="tile-chart">
          <div className="flex-row">
            <div className="flex-col">
              <svg width="48" height="48" viewBox="0 0 24 24" fill={this.state.palette[0]}>
                <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,22V16H7.5L10.09,8.41C10.34,7.59 11.1,7 12,7C12.9,7 13.66,7.59 13.91,8.41L16.5,16H13.5V22H10.5Z"/>
              </svg>
              <div>Female:</div>
              <div>{format(populationBySex.values.FEMALES_CY.value, 'n0')}</div>
            </div>
            <div className="flex-col">
              <wjChart.FlexPie className="chart chart-pie" bindingName="label" binding="value" innerRadius={0.5} itemsSource={populationData} palette={this.state.palette}>
                <wjChart.FlexPieDataLabel position="Inside" content="{value}%" offset={10}/>
                <wjChart.FlexChartLegend position="None"/>
                <wjChartAnimate.FlexChartAnimation />
              </wjChart.FlexPie>
            </div>
            <div className="flex-col">
              <svg width="48" height="48" viewBox="0 0 24 24" fill={this.state.palette[1]}>
                <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A2,2 0 0,1 15.5,9V14.5H14V22H10V14.5H8.5V9A2,2 0 0,1 10.5,7Z"/>
              </svg>
              <div>Male:</div>
              <div>{format(populationBySex.values.MALES_CY.value, 'n0')}</div>
            </div>
          </div>
        </div>
      </GdashTile>);
        const renderMedianAgeTile = (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M16 9C22 9 22 13 22 13V15H16V13C16 13 16 11.31 14.85 9.8C14.68 9.57 14.47 9.35 14.25 9.14C14.77 9.06 15.34 9 16 9M2 13C2 13 2 9 8 9S14 13 14 13V15H2V13M9 17V19H15V17L18 20L15 23V21H9V23L6 20L9 17M8 1C6.34 1 5 2.34 5 4S6.34 7 8 7 11 5.66 11 4 9.66 1 8 1M16 1C14.34 1 13 2.34 13 4S14.34 7 16 7 19 5.66 19 4 17.66 1 16 1Z"/>
          </svg>} header="Median Age">
        <div className="tile-description">
          The median age is <b>{format(age.values.MEDAGE_CY.value, 'n1')} years</b>
        </div>
        <wjChart.FlexChart ref={this.medianAgeChartRef} className="chart chart-median" chartType="Column" plotMargin="40 0 60 0" itemsSource={age.shortList} bindingX="name" tooltipContent="{y} people <br/> are {x}" palette={this.state.palette}>
          <wjChart.FlexChartAxis wjProperty="axisX" majorTickMarks="None" majorGrid={false} axisLine={true} labels={true}/>
          <wjChart.FlexChartAxis wjProperty="axisY" position="None"/>
          <wjChart.FlexChartDataLabel content="{y}" border={true} connectingLine={true} offset={10} position="Top"/>
          <wjChartAnimate.FlexChartAnimation />
        </wjChart.FlexChart>
      </GdashTile>);
        const stackedHouseholdIncome = householdIncome.shortList.reduce((obj, item, idx) => {
            obj[0][idx] = item.value;
            return obj;
        }, [{}]);
        const renderHouseholdIncome = (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z"/>
          </svg>} header="Household Income">
        <div className="tile-description">
          The average income is <b>${format(householdIncome.values.MEDHINC_CY.value, 'n0')}</b>
        </div>
        <wjChart.FlexChart className="chart chart-bar-stacked" chartType="Bar" stacking="Stacked100pc" itemsSource={stackedHouseholdIncome} palette={this.state.palette}>
          <wjChart.FlexChartAxis wjProperty="axisY" position="None"/>
          <wjChart.FlexChartAxis wjProperty="axisX" position="None"/>
          <wjChart.FlexChartDataLabel content="{y}" position="Left" offset={10}/>
          <wjChart.FlexChartSeries name="Under 75k" binding="0"/>
          <wjChart.FlexChartSeries name="75k to 150k" binding="1"/>
          <wjChart.FlexChartSeries name="150k and above" binding="2"/>
          <wjChart.FlexChartLegend position="Bottom"/>
        </wjChart.FlexChart>
      </GdashTile>);
        const renderNetWorth = (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M20,18H4V6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M11,17H13V16H14A1,1 0 0,0 15,15V12A1,1 0 0,0 14,11H11V10H15V8H13V7H11V8H10A1,1 0 0,0 9,9V12A1,1 0 0,0 10,13H13V14H9V16H11V17Z"/>
          </svg>} header="Median Household Net Worth">
        <div className="tile-description">
          <p>
            The median net worth is <b>${format(netWorth.values.MEDNW_CY.value, 'n0')}</b>
          </p>
        </div>
        <div className="tile-chart">
          <wjGauge.LinearGauge className="gauge gauge-linear" min={0} max={300000} value={netWorth.values.MEDNW_CY.value} showTicks={true} showRanges={false} tickSpacing={50000}>
            <wjGauge.Range min={0} max={300000} color={this.state.palette[0]}/>
          </wjGauge.LinearGauge>
        </div>
      </GdashTile>);
        const renderHomeValue = (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12,3L22,12H19V20H5V12H2L12,3M9.22,8.93C8.75,9.4 8.5,10.03 8.5,10.75C8.5,12.43 10.54,13.07 11.76,13.46C13.26,13.93 13.47,14.21 13.5,14.25C13.5,15 12.15,15 12,15V15C11.37,15 11.03,14.88 10.86,14.78C10.67,14.67 10.5,14.5 10.5,14H8.5C8.5,15.43 9.24,16.16 9.85,16.5C10.18,16.7 10.57,16.84 11,16.92V18H13V16.91C14.53,16.61 15.5,15.62 15.5,14.25C15.5,12.67 13.88,12.03 12.36,11.55C10.8,11.06 10.53,10.77 10.5,10.75C10.5,10.5 10.57,10.41 10.64,10.34C10.85,10.13 11.36,10 12,10V10C12.68,10 13.5,10.13 13.5,10.75H15.5C15.5,9.34 14.56,8.37 13,8.09V7H11V8.08C10.26,8.21 9.65,8.5 9.22,8.93Z"/>
          </svg>} header="Home Values">
        <div className="tile-description">
          <b>{homeValue.values.NAME.value}'s</b> median home value is{' '}
          <b>${format(homeValue.values.MEDVAL_CY.value, 'n1')}</b> (
          {this.getIndexDescription(homeValue.values.MEDVAL_I.value)}).
        </div>
        <table>
          <tbody>
            <tr>
              <td>Home Value Index</td>
              <td>
                <GdashSlider value={homeValue.values.MEDVAL_I.value} color={this.state.palette[1]}/>
              </td>
            </tr>
            <tr>
              <td>Household Income Index</td>
              <td>
                <GdashSlider value={this.sources.homeValue.values.MEDHINC_I.value} color={this.state.palette[1]}/>
              </td>
            </tr>
            <tr>
              <td>Net Worth Index</td>
              <td>
                <GdashSlider value={this.sources.homeValue.values.MEDNW_I.value} color={this.state.palette[1]}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tile-chart">
          <div className="btn-group btn-group-toggle">
            <label className={`btn ${detailed ? '' : 'active'}`}>
              <input type="radio" checked={!detailed} onChange={() => this.setState({ detailed: false })}/>
              Summary
            </label>
            <label className={`btn ${detailed ? 'active' : ''}`}>
              <input type="radio" checked={detailed} onChange={() => this.setState({ detailed: true })}/>
              Details
            </label>
          </div>
          <div>
            <wjChart.FlexChart ref={this.homeValueDistributionChartRef} style={{ height: '350px', display: detailed ? 'block' : 'none' }} className="chart chart-bar" chartType="Bar" itemsSource={this.sources.homeValue.list} plotMargin="10 50 10 130" tooltipContent="{y} people <br/> are {x}" palette={this.state.palette}>
              <wjChart.FlexChartAxis wjProperty="axisX" axisLine={false} majorGrid={false} labels={false}/>
              <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false} axisLine={true} labels={true}/>
              <wjChart.FlexChartDataLabel content="{y}" border={true} connectingLine={true} offset={6} position="Right"/>
              <wjChartAnimate.FlexChartAnimation />
            </wjChart.FlexChart>

            <wjChart.FlexChart ref={this.homeValueChartRef} style={{ display: detailed ? 'none' : 'block' }} className="chart chart-bar" itemsSource={homeValue.shortList} chartType="Bar" bindingX="name" tooltipContent="{y} homes in the <br/>{x} range" palette={this.state.palette}>
              <wjChart.FlexChartAxis wjProperty="axisX" majorTickMarks="None" majorGrid={true} axisLine={false} labels={false}/>
              <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false}/>
            </wjChart.FlexChart>
          </div>
        </div>
      </GdashTile>);
        return (<div className="data-group" style={{ display: location.isValid ? '' : 'none' }}>
        <div className="group">
          <div className="group-title">{location.name}</div>
          <div className="group-subtitle"></div>
          <div className="group-description">
            {`The dominant tapestry is ${tapestry.values.TAPSEGNAM.value}. ${domTapDescription}`}
          </div>
        </div>

        <TabPanel selectedIndex={0}>
          <Tab>
            <a href="#">Demographics</a>
            <div>
              <div className="data-col">{renderPopulationTile}</div>
              <div className="data-col">{renderMedianAgeTile}</div>
            </div>
          </Tab>
          <Tab>
            <a href="#">Affluence</a>
            <div>
              <div className="data-col">{renderNetWorth}</div>
              <div className="data-col">{renderHomeValue}</div>
              <div className="data-col">{renderHouseholdIncome}</div>
            </div>
          </Tab>
        </TabPanel>
      </div>);
    }
    handleExtentChange(value) {
        this.gdashService.setExtent(value);
    }
    updateSearch(value) {
        this.setState({
            search: value,
            searchEnabled: value && value.length > 0,
        });
    }
    // get a description for an index (100 is the national average, 50 is half, 200 is double, etc)
    getIndexDescription(index) {
        return this.gdashService.getIndexDescription(index);
    }
    // show tiles for a given info source
    selectSource(source) {
        const map = this.mapRef.current;
        if (source !== map.getTileSource()) {
            for (const key of Object.keys(this.sources)) {
                this.sources[key].selected = this.sources[key] === source;
            }
            map.setTileSource(source);
            this.legendRef.current.setSource(source);
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
    gotoLocation(lon, lat) {
        return esriLoader
            .loadModules(['esri/geometry/Point', 'esri/geometry/support/webMercatorUtils'])
            .then(([Point, webMercatorUtils]) => {
            let extent = this.gdashService.getExtent();
            extent = extent.clone();
            const [x, y] = webMercatorUtils.lngLatToXY(lon, lat);
            const point = new Point({ x, y, z: extent.z });
            extent = extent.centerAt(point);
            this.gdashService.setExtent(extent);
            this.mapRef.current.setExtent(extent);
        });
    }
    onGotData() {
        this.gdashService.getLocation().then((location) => {
            this.setState({
                location: location,
                domTapDescription: this.gdashService.getDomTapDescription(),
            });
            window.setTimeout(() => this.updateCharts(), 0);
        });
    }
    updateCharts() {
        this.updateChart(this.medianAgeChartRef.current.control);
        this.updateChart(this.homeValueChartRef.current.control);
        this.updateChart(this.homeValueDistributionChartRef.current.control);
    }
    updateChart(chart) {
        if (!chart)
            return;
        chart.beginUpdate();
        try {
            chart.series.clear();
            const valueSeries = new wjcChart.Series();
            valueSeries.binding = 'value';
            valueSeries.style = {};
            chart.bindingX = 'name';
            chart.series.push(valueSeries);
        }
        finally {
            chart.endUpdate();
        }
    }
}
