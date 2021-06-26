import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as pdf from "@grapecity/wijmo.pdf";
import * as chart from "@grapecity/wijmo.chart";
import * as wjFlexPie from "@grapecity/wijmo.react.chart";
import { getExpenses } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: (totals => [
                { name: 'Hotel', value: totals.hotel },
                { name: 'Transport', value: totals.transport },
                { name: 'Meal', value: totals.meal },
                { name: 'Fuel', value: totals.fuel },
                { name: 'Misc', value: totals.misc }
            ])(getExpenses().totals)
        };
    }
    render() {
        return <div className="container-fluid">
            <wjFlexPie.FlexPie binding="value" bindingName="name" innerRadius={0.75} itemsSource={this.state.data} initialized={this.initializeFlexPie.bind(this)}>
                <wjFlexPie.FlexPieDataLabel content="{value:c1}" position="Inside"></wjFlexPie.FlexPieDataLabel>
            </wjFlexPie.FlexPie>

            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>
        </div>;
    }
    initializeFlexPie(ctrl) {
        this.flexPie = ctrl;
    }
    exportPDF() {
        let doc = new pdf.PdfDocument({
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        this.flexPie.saveImageToDataUrl(chart.ImageFormat.Svg, url => {
            doc.drawText('Total expenses by category:');
            doc.drawSvg(url);
            doc.end();
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
