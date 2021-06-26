import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjHierarchical from '@grapecity/wijmo.react.chart.hierarchical';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initSunburst = (sender) => {
            sender.dataLabel.content = "{name}";
        };
        this.state = {
            data: getData(),
            palette: ['rgba(92,184,92,1)', 'rgba(240,173,78,1)', 'rgba(91,192,222,1)', 'rgba(217,83,79,1)', 'rgba(159,91,222,1)', 'rgba(70,219,140,1)', 'rgba(182,184,110,1)', 'rgba(78,93,108,1)', 'rgba(43,62,75,1)']
        };
    }
    render() {
        return <div className="container-fluid">
            <wjHierarchical.Sunburst binding="value" bindingName="year, quarter, month" childItemsPath="items" isAnimated={true} selectionMode="Point" selectedItemPosition="Top" selectedItemOffset={0.3} initialized={this.initSunburst} itemsSource={this.state.data} palette={this.state.palette}>
                <wjChart.FlexPieDataLabel position="Center"></wjChart.FlexPieDataLabel>
            </wjHierarchical.Sunburst>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
