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
        this.menuItemClicked = (menu) => {
            this.setState({ type: menu.selectedValue });
        };
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            type: 'Squarified'
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjInput.Menu header='Type' value={this.state.type} itemClicked={this.menuItemClicked}>
                    <wjInput.MenuItem value="Squarified">Squarified</wjInput.MenuItem>
                    <wjInput.MenuItem value="Horizontal">Horizontal</wjInput.MenuItem>
                    <wjInput.MenuItem value="Vertical">Vertical</wjInput.MenuItem>
                </wjInput.Menu>
                <wjHierarchical.TreeMap binding="sales" bindingName={['category', 'subCategory']} type={this.state.type} initialized={this.initTreemap} itemsSource={this.state.data} palette={this.state.palette} maxDepth={this.state.maxDepth}>
                </wjHierarchical.TreeMap>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
