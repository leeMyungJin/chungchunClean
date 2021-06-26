import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import getData from './data';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { FlexChart, FlexChartSeries } from '@grapecity/wijmo.react.chart';
import { RadialGauge, LinearGauge } from '@grapecity/wijmo.react.gauge';
class App extends React.Component {
    render() {
        return (<TabPanel>
                <Tab>
                    <a>FlexGrid</a>
                    <div>
                        <FlexGrid itemsSource={getData()}/>
                    </div>
                </Tab>
                <Tab>
                    <a>FlexChart</a>
                    <div>
                        <FlexChart itemsSource={getData()} bindingX="country">
                            <FlexChartSeries name="Sales" binding="sales"/>
                            <FlexChartSeries name="Expenses" binding="expenses"/>
                            <FlexChartSeries name="Downloads" binding="downloads"/>
                        </FlexChart>
                    </div>
                </Tab>
                <Tab>
                    <a>Gauges</a>
                    <div style={{ overflow: 'hidden' }}>
                        <RadialGauge style={{ display: 'block' }} value={75} min={0} isReadOnly={false} max={100}/>
                        <LinearGauge style={{ display: 'block' }} value={75} min={0} isReadOnly={false} max={100}/>
                    </div>
                </Tab>
            </TabPanel>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
