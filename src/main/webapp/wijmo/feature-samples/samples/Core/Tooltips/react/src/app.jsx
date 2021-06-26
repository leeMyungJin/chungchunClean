import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
class App extends React.Component {
    render() {
        return <div className="container-fluid">
            <p>
                This paragraph has a <b id='span1'>span with a tooltip</b>.
            </p>
            <p>
                This paragraph has a <b id='span2'>span with a tooltip</b> whose
                content is taken from another element.
            </p>
            <p>
                The button below also has a tooltip:
            </p>
            <button id='btnAddNew' className="btn btn-default">
                Button
            </button>

            <div id="spanTooltip" style={{ display: "none" }}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        Title
                    </div>
                    <div className="panel-body">
                        This is the second span.
                    </div>
                </div>
            </div>
        </div>;
    }
    componentDidMount() {
        let tt = new Tooltip();
        //
        // Tooltip with HTML content
        tt.setTooltip('#span1', 'This is the <b>first</b> span.');
        //
        // Tooltip with content from another element
        tt.setTooltip('#span2', '#spanTooltip');
        //
        // Tooltip with custom position (default is Above)
        tt.setTooltip('#btnAddNew', 'This tooltip appears on the right of the button.', PopupPosition.Right);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
