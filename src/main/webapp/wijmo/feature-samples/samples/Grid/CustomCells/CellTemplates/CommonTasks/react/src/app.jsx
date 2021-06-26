import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import { Globalize } from '@grapecity/wijmo';
import * as DataService from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: DataService.getData(),
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
    render() {
        return <div className="container-fluid">
            <p>
                This sample shows how to use the <b>FlexGridCellTemplate</b> directive 
                (part of our React interop) as well as the <b>cellTemplate</b> property.
            </p>
            <FlexGrid showSelectedHeaders="All" selectionMode="MultiRange" headersVisibility="Column" showMarquee={true} itemsSource={this.state.data}>
                
                <FlexGridColumn binding="id" header="ID" isReadOnly={true} width=".5*"/>
                <FlexGridColumn binding="date" header="Date" width="*"/>
                <FlexGridColumn binding="product" header="Product" dataMap={this.state.products} width="*"/>
                
                
                <FlexGridColumn header="Country" binding="country" dataMap={this.state.countryMap} width="*">
                    <FlexGridCellTemplate cellType="Cell" template={cell => <React.Fragment>
                            <span className={'flag-icon flag-icon-' + this.getCountry(cell.item).flag}></span>
                            {' '}
                            {cell.col.dataMap.getDisplayValue(cell.item.country)}
                        </React.Fragment>}/>
                </FlexGridColumn>
                    
                
                <FlexGridColumn binding="country" header="Country *" dataMap={this.state.countryMap} width="*" cellTemplate="<span class=\'flag-icon flag-icon-${col.dataMap.getDataItem(value).flag}\'></span> ${text}"/>
                
                
                <FlexGridColumn binding="color" header="Color" dataMap={this.state.colors} width="*">
                    <FlexGridCellTemplate cellType="Cell" template={cell => <React.Fragment>
                            <span className="color-tile" style={{ 'background': cell.item.color }}></span>
                            &nbsp;
                            {cell.item.color}
                        </React.Fragment>}/>
                </FlexGridColumn>

                
                <FlexGridColumn binding="color" header="Color *" dataMap={this.state.colors} width="*" cellTemplate="<span class='color-tile' style='background:${value}'></span> ${text}"/>

                <FlexGridColumn binding="value" header="Value" format="c0" width="*"/>

                
                <FlexGridColumn binding="change" header="Change" align="center" format="p0" width="*">
                    <FlexGridCellTemplate cellType="Cell" template={cell => <React.Fragment>
                            <span className={cell.item.change > 0 ? 'change-up' : 'change-down'}>
                                {this.format(cell.item.change, cell.col.format)}
                            </span>
                        </React.Fragment>}/>
                </FlexGridColumn>

                
                <FlexGridColumn binding="change" header="Change *" format="p0" align="center" width="*" cellTemplate="<span class=${value > 0 ? 'change-up' : 'change-down'}>${text}</span>"/>

            </FlexGrid>
            <p>
                <b>*</b>: Columns created with the <b>cellTemplate</b> property.
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
