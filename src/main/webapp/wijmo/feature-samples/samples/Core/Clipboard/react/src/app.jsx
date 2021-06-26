import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { Clipboard } from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.copying = (s, e) => {
            this.setState({ hasHeaders: this.state.includeHeaders });
            if (this.state.includeHeaders) {
                // copy text with headers and copyright notice to clipboard
                let text = s.getClipString(null, false, true, false);
                text = text + '\r\n(c) 2019 Grapecity Inc';
                // put text with headers on the clipboard
                Clipboard.copy(text);
                // prevent the grid from overwriting our clipboard content
                e.cancel = true;
            }
        };
        this.pasting = (sender, args) => {
            if (this.state.hasHeaders) {
                args.cancel = true;
            }
        };
        this.state = {
            data: getData(),
            includeHeaders: true,
            hasHeaders: false
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Include Headers{' '}
                <input type="checkbox" defaultChecked={true} onChange={e => this.setState({ includeHeaders: e.target.checked })}/>
            </label>

            <FlexGrid itemsSource={this.state.data} copying={this.copying} pasting={this.pasting}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
