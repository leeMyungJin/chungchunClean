import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <h2>
                Default Grid
            </h2>
            <p>Copy and paste cell ranges like in Excel.</p>
            <FlexGrid alternatingRowStep={0} itemsSource={this.state.data}/>
            
            <h2>
                Read-Only Grid
            </h2>
            <p>
                Copy data and column header information (pasting not allowed).
            </p>
            <FlexGrid copyHeaders={'Column'} isReadOnly={true} alternatingRowStep={0} itemsSource={this.state.data}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
