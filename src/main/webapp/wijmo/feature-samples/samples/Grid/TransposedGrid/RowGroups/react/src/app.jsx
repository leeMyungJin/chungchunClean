import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch';
import { TransposedGrid } from '@grapecity/wijmo.react.grid.transposed';
import { getRowGroups, getDeeperRowGroups, getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.rowGroups1 = getRowGroups();
        this.rowGroups2 = getDeeperRowGroups();
        this.state = {
            data: getData(),
            animated: true,
            rowGroups: this.rowGroups1
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Collapse/Expand Animation{' '}
                <input type="checkbox" checked={this.state.animated} onChange={e => {
            this.setState({
                animated: !this.state.animated
            });
        }}/>
            </label>
            <button id="toggle" className="btn btn-primary" onClick={e => {
            this.setState({
                rowGroups: this.state.rowGroups == this.rowGroups1 ? this.rowGroups2 : this.rowGroups1
            });
        }}>
                Toggle Row Groups
            </button>
            <div className={this.state.animated ? 'animated' : null}>
                <TransposedGrid showSelectedHeaders="Row" alternatingRowStep={0} showMarquee={true} autoGenerateRows={false} rowGroups={this.state.rowGroups} itemsSource={this.state.data}/>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
