import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            flex: null,
            showMarquee: true
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Show Marquee
                <input checked={this.state.showMarquee} onChange={this.gridShowMarquee.bind(this)} onClick={this.gridGetFocus.bind(this)} type="checkbox"/>
            </label>
            <br />
            <label>
                Custom Marquee
                <input onClick={this.showCustomMarquee.bind(this)} type="checkbox"/>
            </label>
            <br />
                <label>
                Highlight Active Cell
                <input onClick={this.highlightActive.bind(this)} type="checkbox"/>
            </label>
            
            <wjcGrid.FlexGrid initialized={this.initGrid.bind(this)} alternatingRowStep={0} showSelectedHeaders={'All'} showMarquee={this.state.showMarquee} itemsSource={this.state.data}>

            </wjcGrid.FlexGrid>

        </div>;
    }
    initGrid(flex) {
        this.setState({
            flex: flex
        });
    }
    gridGetFocus() {
        this.state.flex.focus();
    }
    gridShowMarquee(e) {
        this.setState({
            showMarquee: (e.target).checked
        });
    }
    showCustomMarquee(e) {
        wjcCore.toggleClass(this.state.flex.hostElement, 'customMarquee', e.target.checked);
        this.state.flex.invalidate();
        this.state.flex.focus();
    }
    highlightActive(e) {
        wjcCore.toggleClass(this.state.flex.hostElement, 'highlightActive', e.target.checked);
        this.state.flex.focus();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
