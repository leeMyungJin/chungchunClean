import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import * as DataService from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.colGroups1 = DataService.getColumnGroups();
        this.colGroups2 = DataService.getDeeperColumnGroups();
        this.state = {
            data: DataService.getData(),
            animated: true,
            columnGroups: this.colGroups1
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
                columnGroups: this.state.columnGroups == this.colGroups1 ? this.colGroups2 : this.colGroups1
            });
        }}>
                Toggle Column Groups
            </button>
            <div className={this.state.animated ? 'animated' : null}>
                <FlexGrid headersVisibility="Column" alternatingRowStep={0} showMarquee={true} showSelectedHeaders="All" autoGenerateColumns={false} columnGroups={this.state.columnGroups} itemsSource={this.state.data}/>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
