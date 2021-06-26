import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjHierarchical from '@grapecity/wijmo.react.chart.hierarchical';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initTreemap = (sender) => {
            sender.dataLabel.content = "{name}";
        };
        this.getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
            let rand = Math.floor(Math.random() * palettes.length);
            //
            return Palettes[palettes[rand]];
        };
        this.maxDepthChanged = (s) => {
            if (s.value >= s.min && s.value <= s.max) {
                this.setState({ maxDepth: s.value });
            }
        };
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            maxDepth: 1
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label>Max Depth</label>
                <wjInput.InputNumber min={0} max={4} step={1} format="n0" value={this.state.maxDepth} valueChanged={this.maxDepthChanged}></wjInput.InputNumber>
            </div>
            <div className="form-group">
                <wjHierarchical.TreeMap binding="sales" bindingName="type" childItemsPath="items" initialized={this.initTreemap} itemsSource={this.state.data} palette={this.state.palette} maxDepth={this.state.maxDepth}>
                </wjHierarchical.TreeMap>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
