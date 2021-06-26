import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import * as wijmo from '@grapecity/wijmo';
import { ComboBox, ColorPicker } from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = (e) => {
            switch (e.target.id) {
                // format group
                case 'save':
                    localStorage.editorContent = this.editorEl.innerHTML;
                    alert('Document Saved to Local Storage.');
                    break;
                case 'undo':
                case 'redo':
                case 'preview':
                case 'removeFormat':
                case 'cut':
                case 'copy':
                case 'paste':
                case 'selectAll':
                    this.execCommand(e.target.id);
                    break;
                // font group
                case 'bold':
                case 'italic':
                case 'underline':
                case 'strikethrough':
                case 'subscript':
                case 'superscript':
                    this.execCommand(e.target.id);
                    break;
                case 'click-me':
                    alert('Wijmo Ribbon Sample');
            }
        };
        this.showBkgPicker = e => {
            this.showPicker(ReactDOM.findDOMNode(this.bkgPicker.current), e);
        };
        this.showClrPicker = e => {
            this.showPicker(ReactDOM.findDOMNode(this.clrPicker.current), e);
        };
        this.showPicker = (pickerComponent, e) => {
            wijmo.showPopup(pickerComponent, e.target, false, true, false);
            pickerComponent.focus();
        };
        this.bkgChanged = colorPicker => {
            this.execCommand('backColor', colorPicker.value);
            this.hideColorPicker(colorPicker);
        };
        this.clrChanged = colorPicker => {
            this.execCommand('foreColor', colorPicker.value);
            this.hideColorPicker(colorPicker);
        };
        this.fontChanged = comboBox => {
            this.execCommand('fontName', comboBox.text);
        };
        this.sizeChanged = comboBox => {
            this.execCommand('fontSize', comboBox.selectedIndex + 1);
        };
        this.execCommand = (cmd, parm = null) => {
            this.editorEl.focus();
            document.execCommand(cmd, false, parm);
        };
        this.state = {
            content: `
                <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            `,
        };
        this.ribbon = React.createRef();
        this.editor = React.createRef();
        this.clrPicker = React.createRef();
        this.bkgPicker = React.createRef();
    }
    componentDidMount() {
        if (localStorage.editorContent) {
            this.setState({ content: localStorage.editorContent });
        }
        const ribbon = this.ribbon.current;
        if (ribbon) {
            const ribbonEl = this.ribbonEl = ReactDOM.findDOMNode(ribbon);
            if (ribbonEl) {
                // handle button clicks
                ribbonEl.addEventListener('click', this.handleButtonClick);
                // hide/show buttons
                ribbonEl.querySelector('.wj-tabheaders').addEventListener('dblclick', e => {
                    if (!wijmo.hasClass(e.target, 'wj-tabheader')) {
                        wijmo.toggleClass(ribbonEl, 'hide-content');
                    }
                });
                // show tooltips
                const tt = new wijmo.Tooltip();
                const els = ribbonEl.querySelectorAll('[aria-label]');
                for (let i = 0; i < els.length; i++) {
                    tt.setTooltip(els[i], els[i].getAttribute('aria-label'));
                }
            }
        }
        const editorEl = this.editorEl = this.editor.current;
        if (editorEl) {
            // save/restore editor selection on focus changes
            editorEl.addEventListener('keyup', () => this.selection = this.saveSelection());
            editorEl.addEventListener('mouseup', () => this.selection = this.saveSelection());
            editorEl.addEventListener('focus', () => this.restoreSelection(this.selection));
        }
    }
    saveSelection() {
        const sel = window.getSelection();
        return sel && sel.rangeCount ? sel.getRangeAt(0) : null;
    }
    restoreSelection(range) {
        if (range) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    hideColorPicker(colorPicker) {
        wijmo.hidePopup(colorPicker.hostElement);
    }
    render() {
        return (<div>
                <TabPanel ref={this.ribbon}>
                    <Tab>
                        <a>Format</a>
                        <div>
                            <div className="wj-group">
                                <div className="wj-content">
                                    <div className="wj-column">
                                        <button id="save" className="wj-btn wj-btn-large">
                                            <i className="material-icons">save</i>
                                            <br />
                                        Save
                                    </button>
                                    </div>
                                    <div className="wj-column">
                                        <div className="wj-row">
                                            <button id="undo" className="wj-btn" aria-label="Undo">
                                                <i className="material-icons">undo</i>
                                            </button>
                                            <button id="redo" className="wj-btn" aria-label="Redo">
                                                <i className="material-icons">redo</i>
                                            </button>
                                            <button id="preview" className="wj-btn" aria-label="Preview">
                                                <i className="material-icons">pageview</i>
                                            </button>
                                            <button id="removeFormat" className="wj-btn" aria-label="Remove Format">
                                                <i className="material-icons">format_clear</i>
                                            </button>
                                        </div>
                                        <div className="wj-row">
                                            <button id="cut" className="wj-btn" aria-label="Cut">
                                                <i className="material-icons">&#x2702;</i>
                                            </button>
                                            <button id="copy" className="wj-btn" aria-label="Copy">
                                                <i className="material-icons">&#xE14D;</i>
                                            </button>
                                            <button id="paste" className="wj-btn" aria-label="Paste">
                                                <i className="material-icons">&#xE85D;</i>
                                            </button>
                                            <button id="selectAll" className="wj-btn" aria-label="Select All">
                                                <i className="material-icons">select_all</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="wj-header">Actions</div>
                            </div>
                            <div className="wj-group">
                                <div className="wj-content">
                                    <div className="wj-row">
                                        <ComboBox id="fontFace" aria-label="Font Face" itemsSource={['Arial', 'Courier New', 'Garamond', 'Tahoma', 'Times', 'Verdana', 'WingDings']} textChanged={this.fontChanged}/>
                                        <ComboBox id="fontSize" aria-label="Font Size" itemsSource={['Very Small', 'Smaller', 'Small', 'Medium', 'Large', 'Larger', 'Very Large']} selectedIndex={3} textChanged={this.sizeChanged}/>
                                        <ColorPicker ref={this.bkgPicker} style={{ display: 'none' }} valueChanged={this.bkgChanged} lostFocus={this.hideColorPicker}/>
                                        <button id="background" className="wj-btn" aria-label="Background Color" onClick={this.showBkgPicker}>
                                            <i className="material-icons">format_color_fill</i>
                                        </button>
                                        <ColorPicker ref={this.clrPicker} style={{ display: 'none' }} valueChanged={this.clrChanged} lostFocus={this.hideColorPicker}/>
                                        <button id="color" className="wj-btn" aria-label="Text Color" onClick={this.showClrPicker}>
                                            <i className="material-icons">format_color_text</i>
                                        </button>
                                    </div>
                                    <div className="wj-row">
                                        <button id="bold" className="wj-btn" aria-label="Bold">
                                            <i className="material-icons">format_bold</i>
                                        </button>
                                        <button id="italic" className="wj-btn" aria-label="Italic">
                                            <i className="material-icons">format_italic</i>
                                        </button>
                                        <button id="underline" className="wj-btn" aria-label="Underline">
                                            <i className="material-icons">format_underline</i>
                                        </button>
                                        <button id="strikethrough" className="wj-btn" aria-label="Strikethrough">
                                            <i className="material-icons">format_strikethrough</i>
                                        </button>
                                        <button id="subscript" className="wj-btn" aria-label="Subscript">
                                            <i className="material-icons">vertical_align_bottom</i>
                                        </button>
                                        <button id="superscript" className="wj-btn" aria-label="Superscript">
                                            <i className="material-icons">vertical_align_top</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="wj-header">Font</div>
                            </div>
                        </div>
                    </Tab>
                    <Tab>
                        <a>Custom Tab</a>
                        <div>
                            <div className="wj-group">
                                <div className="wj-content">
                                    <div className="wj-column">
                                        <button id="click-me" className="wj-btn wj-btn-large">
                                            Click Me
                                </button>
                                    </div>
                                </div>
                                <div className="wj-header">Custom Group</div>
                            </div>
                        </div>
                    </Tab>
                </TabPanel>
                <div className='editor' ref={this.editor} contentEditable dangerouslySetInnerHTML={{ __html: this.state.content }}/>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
