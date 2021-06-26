import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import { Control, Globalize } from '@grapecity/wijmo';
import * as DataService from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: DataService.getData(1500),
            products: DataService.getProducts(),
            colors: DataService.getColors(),
            countryMap: DataService.getCountryMap()
        };
    }
    // get a country object from a data item
    // (this makes our template expressions simpler)
    getCountry(item) {
        return this.state.countryMap.getDataItem(item.country);
    }
    // format numbers and dates
    format(val, fmt) {
        return Globalize.format(val, fmt);
    }
    // compare
    benchmark() {
        let reps = 250;
        let grid = Control.getControl(document.querySelector('.bm-react'));
        let start = Date.now();
        for (let i = 0; i < reps; i++) {
            grid.select(i, 0);
            grid.refresh();
        }
        console.log('react done in', Date.now() - start);
        grid = Control.getControl(document.querySelector('.bm-ct'));
        start = Date.now();
        for (let i = 0; i < reps; i++) {
            grid.select(i, 0);
            grid.refresh();
        }
        console.log('cellTemplate done in', Date.now() - start);
        grid = Control.getControl(document.querySelector('.bm-none'));
        start = Date.now();
        for (let i = 0; i < reps; i++) {
            grid.select(i, 0);
            grid.refresh();
        }
        console.log('no template done in', Date.now() - start);
    }
    render() {
        return <div>
            <button className="btn btn-primary" onClick={this.benchmark}>
                Benchmark
            </button>

            <h1>React Templates</h1>
            <FlexGrid className="bm-react" showSelectedHeaders="All" selectionMode="MultiRange" headersVisibility="Column" showMarquee={true} itemsSource={this.state.data}>
                
                <FlexGridColumn binding="id" header="ID" isReadOnly={true} width=".5*"/>
                
                <FlexGridColumn header="Country" binding="country" dataMap={this.state.countryMap} width="*">
                    <FlexGridCellTemplate cellType="Cell" template={cell => <React.Fragment>
                            <span className={'flag-icon flag-icon-' + this.getCountry(cell.item).flag}></span>
                            {' '}
                            {cell.col.dataMap.getDisplayValue(cell.item.country)}
                        </React.Fragment>}/>
                </FlexGridColumn>
                <FlexGridColumn binding="color" header="Color" dataMap={this.state.colors} width="*">
                    <FlexGridCellTemplate cellType="Cell" template={cell => <React.Fragment>
                            <span className="color-tile" style={{ 'background': cell.item.color }}></span>
                            &nbsp;
                            {cell.item.color}
                        </React.Fragment>}/>
                </FlexGridColumn>
                
                <FlexGridColumn binding="change" header="Change" align="center" format="p0" width="*">
                    <FlexGridCellTemplate cellType="Cell" template={cell => <React.Fragment>
                            <span className={cell.item.change > 0 ? 'change-up' : 'change-down'}>
                                {this.format(cell.item.change, cell.col.format)}
                            </span>
                        </React.Fragment>}/>
                </FlexGridColumn>
            </FlexGrid>

            <h1>cellTemplate Templates</h1>
            <FlexGrid className="bm-ct" showSelectedHeaders="All" selectionMode="MultiRange" headersVisibility="Column" showMarquee={true} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" isReadOnly={true} width=".5*"/>
                
                <FlexGridColumn binding="country" header="Country CT" dataMap={this.state.countryMap} width="*" cellTemplate="<span class=\'flag-icon flag-icon-${col.dataMap.getDataItem(value).flag}\'></span> ${text}"/>
                <FlexGridColumn binding="color" header="Color CT" dataMap={this.state.colors} width="*" cellTemplate="<span class='color-tile' style='background:${value}'></span> ${text}"/>
                
                <FlexGridColumn binding="change" header="Change CT" format="p0" align="center" width="*" cellTemplate="<span class=${value > 0 ? 'change-up' : 'change-down'}>${text}</span>"/>
            </FlexGrid>

            <h1>No Templates</h1>
            <FlexGrid className="bm-none" showSelectedHeaders="All" selectionMode="MultiRange" headersVisibility="Column" showMarquee={true} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" isReadOnly={true} width=".5*"/>
                
                <FlexGridColumn binding="country" header="Country CT" dataMap={this.state.countryMap} width="*"/>
                <FlexGridColumn binding="color" header="Color CT" dataMap={this.state.colors} width="*"/>
                
                <FlexGridColumn binding="change" header="Change CT" format="p0" align="center" width="*"/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
