import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MultiRow } from '@grapecity/wijmo.react.grid.multirow';
import { getData, getLayoutDefinition, getHeaderLayoutDefinition } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            layout: getLayoutDefinition(),
            headerLayout: getHeaderLayoutDefinition(),
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Custom Headers:
                <input type="checkbox" defaultChecked={this.state.headerLayout != null} onClick={e => {
            this.setState({ headerLayout: e.target.checked ? getHeaderLayoutDefinition() : null });
        }}/>
            </label> 
            <MultiRow itemsSource={this.state.data} layoutDefinition={this.state.layout} headerLayoutDefinition={this.state.headerLayout}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
