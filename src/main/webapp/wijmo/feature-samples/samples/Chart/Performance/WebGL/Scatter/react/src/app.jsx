import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.chart";
import { WebGLRenderEngine } from "@grapecity/wijmo.chart.webgl";
import { Menu, MenuItem } from '@grapecity/wijmo.react.input';
import { FlexChart, FlexChartAxis, FlexChartSeries } from '@grapecity/wijmo.react.chart';
import { FlexChartGestures } from '@grapecity/wijmo.react.chart.interaction';
import { getData } from './data';
//
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._webglEng = new WebGLRenderEngine();
        this._svgEng = new wjChart.SvgRenderEngine();
        //
        this.gesturesInitialized = (s) => {
            this._gestures = s;
        };
        //
        this.numPointsChanged = (s) => {
            this.setState({ numberOfPoints: s.selectedValue }, this.refreshData);
        };
        //
        this.numSeriesChanged = (s) => {
            this.setState({ numberOfSeries: s.selectedValue }, this.refreshData);
        };
        //
        this.symbolChanged = (s) => {
            this.setState({ seriesSymbol: s.selectedValue });
        };
        //
        this.sizeChanged = (s) => {
            this.setState({ symbolSize: s.selectedValue });
        };
        //
        this.engineChanged = (e) => {
            this.setState({ useWebGL: e.target.checked });
        };
        //
        this.refreshData = () => {
            const { numberOfSeries: nser, numberOfPoints: npts, } = this.state;
            const data = [];
            for (let i = 0; i < nser; i++) {
                data.push(getData(Math.random() - 0.5, Math.random() - 0.5, npts / nser, 0.5 * (1 - i / nser)));
            }
            this.setState({ data });
        };
        //
        this.resetZoom = () => {
            this._gestures.reset();
        };
        this.state = {
            numberOfPoints: 100000,
            numberOfSeries: 1,
            seriesSymbol: 'Dot',
            symbolSize: 3,
            useWebGL: true,
            data: [],
        };
    }
    //
    render() {
        return (<div className='container-fluid'>
                <div className="row">
                    <div className="col-sm-12">
                        <Menu header="NumPoints" value={this.state.numberOfPoints} itemClicked={this.numPointsChanged}>
                            <MenuItem value={1000}>1K</MenuItem>
                            <MenuItem value={10000}>10K</MenuItem>
                            <MenuItem value={100000}>100K</MenuItem>
                            <MenuItem value={200000}>200K</MenuItem>
                            <MenuItem value={500000}>500K</MenuItem>
                        </Menu>

                        <Menu header="NumSeries" value={this.state.numberOfSeries} itemClicked={this.numSeriesChanged}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                        </Menu>

                        <Menu header="Symbol" value={this.state.seriesSymbol} itemClicked={this.symbolChanged}>
                            <MenuItem value="Dot">Dot</MenuItem>
                            <MenuItem value="Box">Box</MenuItem>
                        </Menu>

                        <Menu header="Size" value={this.state.symbolSize} itemClicked={this.sizeChanged}>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Menu>

                        <label>
                            Use WebGL
                            <input id="webgl" type="checkbox" checked={this.state.useWebGL} onChange={this.engineChanged}/>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">

                        <FlexChart renderEngine={this.renderEngine} chartType="Scatter" bindingX="x" binding="y" symbolSize={this.state.symbolSize}>
                            <FlexChartAxis wjProperty="axisX" min={-2} max={2}/>
                            <FlexChartAxis wjProperty="axisY" min={-2} max={2} axisLine majorGrid={false}/>
                            <FlexChartGestures interactiveAxes="XY" mouseAction="Zoom" initialized={this.gesturesInitialized} scaleY={1} posY={0.5} scaleX={1} posX={0.5}/>
                            {this.state.data.map((series, i) => {
            return (<FlexChartSeries key={i} itemsSource={series} name={`ser ${i + 1}`} symbolStyle={{ strokeWidth: 0 }} symbolMarker={this.state.seriesSymbol}/>);
        })}
                        </FlexChart>

                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <button id="btnNew" onClick={this.refreshData}>Refresh Data</button>
                        <button id="btnReset" onClick={this.resetZoom}>Reset Zoom</button>
                    </div>
                </div>
            </div>);
    }
    //
    componentDidMount() {
        this.refreshData();
    }
    //
    get renderEngine() {
        return this.state.useWebGL ? this._webglEng : this._svgEng;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
