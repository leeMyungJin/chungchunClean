import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import { getData } from './data';
class App extends React.Component {
    render() {
        return <div className="container-fluid">
            <h3>GIF Spinners</h3>
            <p>This example shows an animated GIF while the grid is loading:</p>
            <LoadingGridWithGif />
            
            <h3>Gauge Spinners</h3>
            <p>This example shows an animated RadialGauge while the grid is loading:</p>
            <LoadingGridWithGuage />
        </div>;
    }
}
class LoadingGridWithGif extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            loading: false,
            data: undefined,
        };
    }
    render() {
        return <div key={Date.now()}>
            <button className="btn btn-primary" onClick={this.loadData.bind(this)}>
                Load Grid Using GIF Spinner
            </button>
            {this.state.loading
            ? <div className="spinner">
                    <img src="resources/Rounded%20blocks.gif"/>
                </div>
            : <wjGrid.FlexGrid itemsSource={this.state.data}/>}
        </div>;
    }
    loadData() {
        this.setState({ loading: true });
        getData((data) => {
            this.setState({ data, loading: false });
        }, 3000);
    }
}
class LoadingGridWithGuage extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            loading: false,
            data: undefined,
        };
    }
    render() {
        return <div key={Date.now()}>
            <button className="btn btn-primary" onClick={this.loadData.bind(this)}>
                Load Grid Using Gauge Spinner
            </button>
            {this.state.loading
            ? (<div><wjGauge.RadialGauge initialized={control => this._guage = control} className="spinner" isAnimated={false} showText="None" sweepAngle={360} step={5} showTicks={true} value={0}>
                        <wjGauge.Range wjProperty="face" color="transparent"/>
                    </wjGauge.RadialGauge></div>)
            : <wjGrid.FlexGrid itemsSource={this.state.data}/>}
        </div>;
    }
    loadData() {
        this.setState({ loading: true });
        clearInterval(this._interval);
        this._interval = setInterval(() => {
            this._guage.value = (this._guage.value + 1) % 100;
        }, 50);
        getData((data) => {
            clearInterval(this._interval);
            this.setState({ data, loading: false });
        }, 3000);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
