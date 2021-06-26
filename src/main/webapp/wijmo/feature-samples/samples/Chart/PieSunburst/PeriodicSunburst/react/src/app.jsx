import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as chart from '@grapecity/wijmo.chart';
import * as wjHierarchical from '@grapecity/wijmo.react.chart.hierarchical';
import { getData } from './data';
import { PropertiesTile } from './properties-tile';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._lastSelectedEle = null;
        this._lastSelectedEleFillColor = '';
        this._hiddenTextElements = [];
        this.initializedChart = (ctrl) => {
            ctrl.dataLabel.content = "{name}";
            let propTile = new PropertiesTile('#properties-tile', ctrl);
            //
            ctrl.hostElement.addEventListener('click', (e) => {
                // If a panel is clicked, visually select it
                this.$_markSelectedPanel(e.clientX, e.clientY);
                // Perform a hit test to get a clicked panel's name then use it to set up the info panel via the ViewAdapter
                propTile.showInfo(ctrl.hitTest(e.pageX, e.pageY).item);
            });
        };
        this.$_markSelectedPanel = (panelX, panelY) => {
            // First, 'unselect' (restore the fill color of) the element that was selected last, if there is one
            if (this._lastSelectedEle && this._lastSelectedEleFillColor) {
                this._lastSelectedEle.setAttribute('fill', this._lastSelectedEleFillColor);
            }
            //
            // Define our selected element and check to see if it's a panel that we can fill
            let selectedElement = document.elementFromPoint(panelX, panelY);
            //
            if (selectedElement && selectedElement.hasAttribute('fill') && selectedElement.tagName === 'path') {
                // Reset the lastSelectedEle and then change the fill color of the clicked panel
                let fillColor = selectedElement.getAttribute('fill');
                this._lastSelectedEle = selectedElement;
                this._lastSelectedEleFillColor = fillColor;
                //
                let color = new wijmo.Color(fillColor);
                color.a = 1;
                selectedElement.setAttribute('fill', color.toString());
                //
                while (this._hiddenTextElements.length > 0) { // if we hid any text elements in the process, reshow them
                    this._hiddenTextElements.pop().style.display = 'block';
                }
            }
            else {
                if (selectedElement && selectedElement.tagName === 'text') { // super hacky way to get the right panel if a data label is clicked
                    selectedElement.style.display = 'none'; // hide the data label
                    this._hiddenTextElements.push(selectedElement); // keep track of hidden text elements
                    this.$_markSelectedPanel(panelX, panelY); // run the method again with the data label hidden
                }
            }
            //
            return false;
        };
        this.state = {
            data: (() => {
                let data = getData();
                data.items.forEach(item => item.value = 1); // add the constant 'value' property to get equal arc angles for all element panels
                return data;
            })(),
            palette: chart.Palettes.superhero
        };
    }
    render() {
        return <div className="container-fluid">
            <wjHierarchical.Sunburst innerRadius={0.3} selectionMode="Point" binding="value" bindingName={['name', 'name', 'symbol']} childItemsPath={['groups', 'items']} initialized={this.initializedChart} itemsSource={this.state.data.groups} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexPieDataLabel position="Radial"></wjChart.FlexPieDataLabel>
                <div id="properties-tile"></div>
            </wjHierarchical.Sunburst>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
