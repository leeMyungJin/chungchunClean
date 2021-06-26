import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onInitialized = (listBox) => {
            this.setState({ listBox: listBox });
            listBox.invalidate();
        };
        this.onSelectedIndexChanged = (sender) => {
            this.setState({ selectedItem: sender.selectedValue });
        };
        this.state = {
            glyphs: ['asterisk', 'calendar', 'check', 'circle', 'clock', 'diamond', 'down',
                'down-left', 'down-right', 'file', 'filter', 'left', 'minus', 'pencil', 'plus', 'right',
                'square', 'step-backward', 'step-forward', 'up', 'up-left', 'up-right'],
            selectedItem: 'asterisk',
            listBox: {}
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                <p>
                    This ListBox uses a <b>wjItemTemplate</b> <i>render prop</i> to 
                    customize the display of the items in the list.
                </p>
            </div>
            <div className="row">
                <div className="col-xs-4">
                    <wjInput.ListBox displayMemberPath="country" itemsSource={this.state.glyphs} selectedIndexChanged={this.onSelectedIndexChanged} initialized={this.onInitialized} wjItemTemplate={(context) => (<div>
                                <div className="wj-glyph">
                                    <span className={`wj-glyph-${context.item}`}></span>
                                </div>
                                {context.item}
                            </div>)}>
                    </wjInput.ListBox>
                </div>
                <div className="col-xs-8">
                    <h1>
                        <span className={'wj-glyph-' + this.state.selectedItem}></span>
                    </h1>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
