import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray, isNumber, toHeaderCase, showPopup, hidePopup } from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import { Palettes, Series, SeriesVisibility } from "@grapecity/wijmo.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            lbData: null
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <div style={{ position: 'relative' }}>
                    <wjChart.FlexChart itemsSource={this.state.data} bindingX="country" palette={this.state.palette} initialized={this.initializeChart.bind(this)}></wjChart.FlexChart>
                    <div id="pickerButton" onClick={this.pickerClick.bind(this)}>
                        <span className="column-picker-icon glyphicon glyphicon-cog"></span>
                    </div>
                </div>
                <div style={{ display: 'none' }}>
                    <wjInput.ListBox initialized={this.initializeLB.bind(this)} itemsSource={this.state.lbData} checkedMemberPath="visible" displayMemberPath="name" lostFocus={this.lostFocus.bind(this)} checkedItemsChanged={this.checkedItemsChanged.bind(this)}></wjInput.ListBox>
                </div>
            </div>
        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
        // auto-generate series
        let item = this.state.data[0];
        for (let k in item) {
            if (isNumber(item[k])) {
                let series = new Series();
                series.binding = k;
                series.name = toHeaderCase(k);
                series['visible'] = true; // add 'visible' property for binding
                this.theChart.series.push(series);
            }
        }
        this.setState({
            lbData: flex.series
        });
    }
    initializeLB(flex) {
        this.theSeriesPicker = flex;
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
    pickerClick(e) {
        showPopup(this.theSeriesPicker.hostElement, e.target, false, true, false);
        this.theSeriesPicker.focus();
        e.preventDefault();
    }
    lostFocus() {
        hidePopup(this.theSeriesPicker.hostElement);
    }
    checkedItemsChanged(s) {
        // map extra 'visible' property to 'Series.visibility' values
        this.theChart.series.forEach(series => {
            series.visibility = s.checkedItems.indexOf(series) > -1
                ? SeriesVisibility.Visible
                : SeriesVisibility.Hidden;
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
