import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { FlexGridContextMenu } from './flex-grid-context-menu';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(100)
        };
    }
    render() {
        return (<div className="container-fluid">
                <FlexGrid showMarquee={true} allowSorting='MultiColumn' itemsSource={this.state.data} initialized={grid => new FlexGridContextMenu(grid)}/>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById("app"));
