import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData, getRandomData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._insertPieIdx = 1;
        this.animationInitialized = (ctrl) => {
            this.animation = ctrl;
        };
        this.animationModeChanged = (e) => {
            if (e.selectedValue) {
                this.setState({ animationMode: e.selectedValue });
                this.animation.animate();
            }
        };
        this.easingChanged = (e) => {
            if (e.selectedValue) {
                this.setState({ easing: e.selectedValue });
                this.animation.animate();
            }
        };
        this.durationChanged = (e) => {
            this.setState({ duration: e.value });
            this.animation.animate();
        };
        this.innerRadiusChanged = (e) => {
            if (e.value < e.min || e.value > e.max) {
                return;
            }
            this.setState({ innerRadius: e.value });
        };
        //
        this.resetData = () => {
            this.setState({ data: getData() });
            this._insertPieIdx = 1;
        };
        this.addSlice = () => {
            this.state.data.push(getRandomData('added' + this._insertPieIdx));
            this._insertPieIdx++;
        };
        this.removeSlice = () => {
            if (this.state.data.length) {
                this.state.data.pop();
                this._insertPieIdx = this._insertPieIdx <= 1 ? 1 : this._insertPieIdx--;
            }
        };
        //
        this._getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
            let rand = Math.floor(Math.random() * palettes.length);
            //
            return Palettes[palettes[rand]];
        };
        this.state = {
            data: getData(),
            palette: this._getRandomPalette(),
            animationMode: 'All',
            easing: 'Swing',
            duration: 400,
            innerRadius: 0
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-xs-12">
                    <wjInput.Menu value={this.state.animationMode} header='Animation Mode' itemClicked={this.animationModeChanged}>
                        <wjInput.MenuItem value="Point">Point</wjInput.MenuItem>
                        <wjInput.MenuItem value="Series">Series</wjInput.MenuItem>
                        <wjInput.MenuItem value="All">All</wjInput.MenuItem>
                    </wjInput.Menu>
                    <wjInput.Menu value={this.state.easing} header='Easing' itemClicked={this.easingChanged}>
                        <wjInput.MenuItem value="Linear">Linear</wjInput.MenuItem>
                        <wjInput.MenuItem value="Swing">Swing</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutQuad">EaseOutQuad</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutQuad">EaseInOutQuad</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInCubic">EaseInCubic</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutCubic">EaseOutCubic</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutCubic">EaseInOutCubic</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInQuart">EaseInQuart</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutQuart">EaseOutQuart</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutQuart">EaseInOutQuart</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInQuint">EaseInQuint</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutQuint"> EaseOutQuint</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutQuint">EaseInOutQuint</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInSine">EaseInSine</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutSine">EaseOutSine</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutSine">EaseInOutSine</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInExpo">EaseInExpo</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutExpo">EaseOutExpo</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutExpo">EaseInOutExpo</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInCirc">EaseInCirc</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutCirc">EaseOutCirc</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutCirc">EaseInOutCirc</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInBack">EaseInBack</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutBack">EaseOutBack</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutBack">EaseInOutBack</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInBounce">EaseInBounce</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutBounce">EaseOutBounce</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutBounce">EaseInOutBounce</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInElastic">EaseInElastic</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseOutElastic">EaseOutElastic</wjInput.MenuItem>
                        <wjInput.MenuItem value="EaseInOutElastic">EaseInOutElastic</wjInput.MenuItem>
                    </wjInput.Menu>
                    <label htmlFor="pieDuration">Duration:</label>
                    <wjInput.InputNumber id="pieDuration" value={this.state.duration} min={200} max={5000} step={200} format="n0" valueChanged={this.durationChanged}>
                    </wjInput.InputNumber>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-xs-12">
                    <label htmlFor="pieInnerRadius">Inner Radius:</label>
                    <wjInput.InputNumber id="pieInnerRadius" value={this.state.innerRadius} min={0} max={1} step={0.1} format="n1" valueChanged={this.innerRadiusChanged}>
                    </wjInput.InputNumber>
                    <button type="button" className="btn btn-default" onClick={this.resetData}>reset data</button>
                    <button type="button" className="btn btn-default" onClick={this.addSlice}>add slice</button>
                    <button type="button" className="btn btn-default" onClick={this.removeSlice}>remove slice</button>
                </div>
            </div>
            <wjChart.FlexPie bindingName="id" binding="y0" innerRadius={this.state.innerRadius} palette={this.state.palette} itemsSource={this.state.data}>
                <wjChartAnimate.FlexChartAnimation animationMode={this.state.animationMode} easing={this.state.easing} duration={this.state.duration} initialized={this.animationInitialized}>
                </wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexPie>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
