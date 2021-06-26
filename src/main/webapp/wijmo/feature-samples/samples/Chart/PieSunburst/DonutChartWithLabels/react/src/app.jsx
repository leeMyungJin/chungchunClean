import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.getLabelContent = (ht) => {
            return wijmo.format('{name} {val:p2}', { name: ht.name, val: ht.value / this.state.sum });
        };
        let data = getData();
        this.state = {
            data: data,
            sum: data.map(c => c.sales).reduce((sum, cur) => sum + cur),
            palette: [
                'rgba(42,159,214,1)',
                'rgba(119,179,0,1)',
                'rgba(153,51,204,1)',
                'rgba(255,136,0,1)',
                'rgba(204,0,0,1)',
                'rgba(0,204,163,1)',
                'rgba(61,109,204,1)',
                'rgba(82,82,82,1)',
                'rgba(0,0,0,1)'
            ]
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexPie header="Best-selling Mobile Phones Brands of 2017" bindingName="brand" binding="sales" innerRadius={0.5} itemsSource={this.state.data} palette={this.state.palette}>
                <wjChart.FlexPieDataLabel position="Outside" content={this.getLabelContent}></wjChart.FlexPieDataLabel>
            </wjChart.FlexPie>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
