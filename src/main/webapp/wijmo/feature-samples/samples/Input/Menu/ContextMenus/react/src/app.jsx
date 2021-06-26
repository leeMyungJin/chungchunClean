import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { Menu, MenuItem, MenuSeparator } from '@grapecity/wijmo.react.input';
import { FlexChart, FlexChartSeries } from '@grapecity/wijmo.react.chart';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._data = getData();
        this.ref = React.createRef();
        this.gridRef = React.createRef();
        this.menuItemClicked = this.menuItemClicked.bind(this);
    }
    //
    render() {
        return (<div className="container-fluid">
                <p>
                    Use the <b>contextMenuOf</b> property of the <b>Menu</b> component
                    to specify elements where the menu should be used as a
                    context menu.
                </p>
                <p>
                    Every element in the array can be referenced using its <i>id</i> or 
                    a React <i>ref</i>.
                </p>
                <div className="owners">
                    <div id="first" style={{ background: '#f0a0a0' }} tabIndex={0}>
                        I have a Context Menu (bound by id attribute).
                    </div>
                    <div id="second" style={{ background: '#a0f0a0' }} ref={this.ref} tabIndex={0}>
                        I have the same Context Menu (bound by React ref).
                    </div>
                </div>

                <h4>The same approach works with all Wijmo controls:</h4>
                <p>                
                    FlexChart with ContextMenu
                </p>
                <FlexChart id="theChart" className="has-ctx-menu" itemsSource={this._data} bindingX="country">
                    <FlexChartSeries binding="sales" name="Sales"/>
                    <FlexChartSeries binding="expenses" name="Expenses"/>
                </FlexChart>

                <p>
                    FlexGrid with ContextMenu
                </p>
                <FlexGrid id="theGrid" ref={this.gridRef} className="has-ctx-menu" itemsSource={this._data}/>

                
                <Menu contextMenuOf={['first', this.ref, 'theChart', this.gridRef]} header="Context Menu" selectedValuePath="cmd" dropDownCssClass="ctx-menu" itemClicked={this.menuItemClicked}>
                    <MenuItem cmd="cmdNew">
                        <span className="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;New
                    </MenuItem>
                    <MenuItem cmd="cmdOpen">
                        <span className="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Open
                    </MenuItem>
                    <MenuItem cmd="cmdSave">
                        <span className="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;Save
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem cmd="cmdExit">
                        <span className="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Exit
                    </MenuItem>
                </Menu>
            </div>);
    }
    //
    menuItemClicked(sender) {
        alert('Executing **' + sender.selectedValue + '** for element **' + sender.owner.id + '**');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
