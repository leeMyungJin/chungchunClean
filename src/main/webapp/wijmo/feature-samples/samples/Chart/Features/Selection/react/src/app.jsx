import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import { isArray } from "@grapecity/wijmo";
import { Palettes } from "@grapecity/wijmo.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            selectionMode: 'Point'
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjInput.Menu value={this.state.selectionMode} header='Selection Mode' itemClicked={this.selectionModeChanged.bind(this)}>
                    <wjInput.MenuItem value="Point">Point</wjInput.MenuItem>
                    <wjInput.MenuItem value="Series">Series</wjInput.MenuItem>
                    <wjInput.MenuItem value="None">None</wjInput.MenuItem>
                </wjInput.Menu>
                    
                <wjChart.FlexChart header="Country GDP" bindingX="country" selectionMode={this.state.selectionMode} itemsSource={this.state.data} palette={this.state.palette}>
                    <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartSeries binding="2014" name="2014"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="2015" name="2015"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="2016" name="2016"></wjChart.FlexChartSeries>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    selectionModeChanged(menu) {
        if (!menu.selectedValue) {
            return;
        }
        this.setState({
            selectionMode: menu.selectedValue
        });
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
