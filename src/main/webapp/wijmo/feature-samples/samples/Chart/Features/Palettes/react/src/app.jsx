import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import { Color } from "@grapecity/wijmo";
import { Palettes } from "@grapecity/wijmo.chart";
import { getData, getPaletteData } from "./data";
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: null,
            paletteData: getPaletteData()
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <div className="row">
                <label>Please select a Palette:</label>
                <wjInput.ComboBox itemsSource={this.state.paletteData} showGroups={true} displayMemberPath="name" selectedIndexChanged={this.selectedIndexChanged.bind(this)} formatItem={this.formatItem}></wjInput.ComboBox>
            </div>
            <div className="row">
                <div className="col">
                    <wjChart.FlexChart header="Country GDP" footer="2016, in USD billions" tooltipContent="<b>{country}</b><br>{value}" itemsSource={this.state.data} bindingX="country" palette={this.state.palette} itemFormatter={this.chartItemFormatter}>
                        <wjChart.FlexChartSeries binding="2016"></wjChart.FlexChartSeries>
                    </wjChart.FlexChart>
                </div>
                <div className="col">
                    <wjChart.FlexPie header="Country GDP" footer="2016, in USD billions" itemsSource={this.state.data} bindingName="country" binding="2016" palette={this.state.palette} itemFormatter={this.pieItemFormatter}>
                    </wjChart.FlexPie>
                </div>
            </div>
        </div>;
    }
    //
    selectedIndexChanged(s) {
        this.setState({ palette: s.selectedItem.colors });
    }
    //
    formatItem(s, e) {
        let item = e.data;
        if (item.name && item.colors) {
            // create palette swatch
            let html = '<div style="width:100px;display:inline-block">' + item.name + '</div>';
            item.colors.forEach(clr => html += `<div style="width:1em;height:1em;display:inline-block;background-color:${clr};"></div>`);
            e.item.innerHTML = html;
        }
    }
    //
    chartItemFormatter(engine, ht, defRender) {
        const pal = ht.chart.palette ? ht.chart.palette : Palettes.standard;
        engine.fill = pal[ht.pointIndex]; // each bar has own color
        engine.stroke = null;
        defRender();
    }
    //
    pieItemFormatter(engine, ht, defRender) {
        let clr = new Color(engine.fill);
        clr.a = 1; // use opaque color
        engine.fill = clr.toString();
        engine.stroke = null;
        defRender();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
