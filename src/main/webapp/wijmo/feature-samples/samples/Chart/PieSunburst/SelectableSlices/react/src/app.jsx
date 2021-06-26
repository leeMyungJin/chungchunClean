import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initPie = (sender) => {
            sender.dataLabel.content = "{value}M";
            sender.tooltip.content = "";
        };
        this.state = {
            data: getData(),
            palette: ['rgba(156,136,217,1)', 'rgba(163,215,103,1)', 'rgba(142,195,192,1)', 'rgba(233,195,169,1)', 'rgba(145,171,54,1)', 'rgba(212,204,192,1)', 'rgba(97,187,216,1)', 'rgba(226,215,111,1)', 'rgba(128,113,90,1)']
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexPie header="Best-selling Mobile Phones Brands of 2017" bindingName="brand" binding="sales" selectionMode="Point" selectedItemPosition="Top" selectedItemOffset={0.2} isAnimated={true} initialized={this.initPie} itemsSource={this.state.data} palette={this.state.palette}>
            </wjChart.FlexPie>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
