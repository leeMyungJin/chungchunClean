import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.customTemplate = `
    <div class="root">  
    <div class="field-list-label">  
      <label wj-part="g-flds"></label>  
    </div>  
    <div class="field-list pad">  
      <div wj-part="d-fields"></div>  
    </div>  
    <div class="drag-areas-label">  
      <label wj-part="g-drag"></label>  
    </div>  
    <div class="filter-list pad">  
      <label>  
        <span class="wj-glyph wj-glyph-filter"></span>   
        <span wj-part="g-flt"></span>  
      </label>  
      <div wj-part="d-filters"></div>  
    </div>  
    <div class="column-list pad bdr-left">  
      <label>  
        <span class="wj-glyph">⫴</span>   
        <span wj-part="g-cols"></span>  
      </label>  
      <div wj-part="d-cols"></div>  
    </div>  
    <div class="row-list pad bdr-top">  
      <label>  
        <span class="wj-glyph">≡</span>   
        <span wj-part="g-rows"></span>  
      </label>  
      <div wj-part="d-rows"></div>  
    </div>  
    <div class="values-list pad bdr-left bdr-top">  
      <label>  
        <span class="wj-glyph">Σ</span>   
        <span wj-part="g-vals"></span>  
      </label>  
      <div wj-part="d-vals"></div>  
    </div>  
    <div wj-part="d-prog" class="progress-bar"></div>  
    <div class="control-area">  
      <label>  
        <input wj-part="chk-defer" type="checkbox">   
        <span wj-part="g-defer">Defer Updates</span>  
      </label>  
      <button wj-part="btn-update" class="wj-btn wj-state-disabled" type="button" disabled>
        Update  
      </button>  
    </div>  
    </div>`;
        wjcOlap.PivotPanel.controlTemplate = this.customTemplate;
        this.state = {
            ngPanel: new wjcOlap.PivotEngine({
                itemsSource: getData(),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
        this.state.ngPanel.fields.getField('Amount').format = 'c0';
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <p>
                            Here is the PivotPanel:
                        </p>
                        <Olap.PivotPanel id="sample-panel" itemsSource={this.state.ngPanel}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-6">
                        <p>
                            And here is the output view:
                        </p>
                        <Olap.PivotGrid itemsSource={this.state.ngPanel}></Olap.PivotGrid>
                    </div>
                </div>

                <div className="panel panel-warning">
                    <div className="panel-heading">
                        IE11 support for CSS Grid layouts is outdated and will
                        not be updated, but you can use
                        <a href="https://autoprefixer.github.io/">AutoPrefixer</a>
                        to add the IE11 support to your CSS automatically.
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
