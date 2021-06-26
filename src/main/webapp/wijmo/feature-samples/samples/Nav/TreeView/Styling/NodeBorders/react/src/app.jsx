import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            customCSS: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <div>
                    <label>
                        Bottom Border 
                        <input id="customCSS" type="checkbox" checked={this.state.customCSS} onClick={this.onCustomCSSClick.bind(this)}/>
                    </label>
                </div>
                <wjNav.TreeView className={this.state.customCSS ? "custom-tree" : ""} itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" initialized={this.initTreeView.bind(this)}></wjNav.TreeView>
            </div>);
    }
    initTreeView(ctl) {
        this._wjTreeViewControl = ctl;
    }
    onCustomCSSClick(e) {
        wjCore.toggleClass(this._wjTreeViewControl.hostElement, 'custom-tree', (e.target).checked);
        this.setState({
            customCSS: !this.state.customCSS
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
