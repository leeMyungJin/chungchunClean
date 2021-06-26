import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { TreeView } from '@grapecity/wijmo.react.nav';
import { toggleClass } from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            msg: 'Ready',
            customCSS: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <div>
                    <label>
                        Use Custom CSS{' '}
                        <input id="customCSS" type="checkbox" checked={this.state.customCSS} onClick={this.onCustomCSSClick.bind(this)}/>
                    </label>
                    <div id="msg" className="msg">
                        {this.state.msg}
                    </div>
                </div>
                <TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" isContentHtml={true} isAnimated={true} initialized={this.initTreeView.bind(this)} className={this.state.customCSS ? 'accordion' : ''}/>
            </div>);
    }
    initTreeView(ctl) {
        this._wjTreeViewControl = ctl;
    }
    onCustomCSSClick() {
        toggleClass(this._wjTreeViewControl.hostElement, 'accordion', !this.state.customCSS);
        this.setState({
            customCSS: !this.state.customCSS
        });
    }
    componentDidMount() {
        let self = this;
        this._wjTreeViewControl.hostElement.addEventListener("click", function (e) {
            if ((e.target).tagName == 'A') {
                self.setState({
                    msg: (<p> Navigating to <b>** {e.target.href} **</b> </p>)
                });
                e.preventDefault();
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
