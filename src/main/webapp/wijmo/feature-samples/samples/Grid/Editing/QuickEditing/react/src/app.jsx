import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            quickEdit: true
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Allow Quick-Editing
                <input onChange={this.onQuickEditChange.bind(this)} className="check-box" type="checkbox" checked={this.state.quickEdit}/>
            </label>

            <wjGrid.FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    onQuickEditChange(e) {
        this.setState({
            quickEdit: !this.state.quickEdit
        });
    }
    initializeGrid(flex) {
        flex.beginningEdit.addHandler((s, e) => {
            if (e.data.type == 'keypress' && !this.state.quickEdit) {
                e.cancel = true;
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
