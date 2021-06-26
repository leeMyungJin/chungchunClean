<template>
    <div class="container-fluid">
        <wj-tab-panel ref="ribbon">
            <wj-tab>
                <a>Format</a>
                <div>
                    <div class="wj-group">
                        <div class="wj-content">
                            <div class="wj-column">
                                <button id="save" class="wj-btn wj-btn-large">
                                    <i class="material-icons">save</i>
                                    <br />
                                    Save
                                </button>
                            </div>
                            <div class="wj-column">
                                <div class="wj-row">
                                    <button id="undo" class="wj-btn" aria-label="Undo">
                                        <i class="material-icons">undo</i>
                                    </button>
                                    <button id="redo" class="wj-btn" aria-label="Redo">
                                        <i class="material-icons">redo</i>
                                    </button>
                                    <button id="preview" class="wj-btn" aria-label="Preview">
                                        <i class="material-icons">pageview</i>
                                    </button>
                                    <button id="removeFormat" class="wj-btn" aria-label="Remove Format">
                                        <i class="material-icons">format_clear</i>
                                    </button>
                                </div>
                                <div class="wj-row">
                                    <button id="cut" class="wj-btn" aria-label="Cut">
                                        <i class="material-icons">&#x2702;</i>
                                    </button>
                                    <button id="copy" class="wj-btn" aria-label="Copy">
                                        <i class="material-icons">&#xE14D;</i>
                                    </button>
                                    <button id="paste" class="wj-btn" aria-label="Paste">
                                        <i class="material-icons">&#xE85D;</i>
                                    </button>
                                    <button id="selectAll" class="wj-btn" aria-label="Select All">
                                        <i class="material-icons">select_all</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="wj-header">Actions</div>
                    </div>
                    <div class="wj-group">
                        <div class="wj-content">
                            <div class="wj-row">
                                <wj-combo-box id="fontFace" aria-label="Font Face"
                                    :itemsSource="['Arial', 'Courier New', 'Garamond', 'Tahoma', 'Times', 'Verdana', 'WingDings']"
                                    :textChanged="_fontChanged"></wj-combo-box>
                                <wj-combo-box id="fontSize" aria-label="Font Size"
                                    :itemsSource="['Very Small', 'Smaller', 'Small', 'Medium', 'Large', 'Larger', 'Very Large']"
                                    :selectedIndex="3" :textChanged="_sizeChanged"></wj-combo-box>
                                <wj-color-picker ref="bkgPicker" style="display: none"
                                    :valueChanged="_bkgChanged"
                                    :lostFocus="_hideColorPicker"></wj-color-picker>
                                <button id="background" class="wj-btn" aria-label="Background Color"
                                    @click="_showBkgPicker">
                                    <i class="material-icons">format_color_fill</i>
                                </button>
                                <wj-color-picker ref="clrPicker" style="display: none"
                                    :valueChanged="_clrChanged"
                                    :lostFocus="_hideColorPicker"></wj-color-picker>
                                <button id="color" class="wj-btn" aria-label="Text Color"
                                    @click="_showClrPicker">
                                    <i class="material-icons">format_color_text</i>
                                </button>
                            </div>
                            <div class="wj-row">
                                <button id="bold" class="wj-btn" aria-label="Bold">
                                    <i class="material-icons">format_bold</i>
                                </button>
                                <button id="italic" class="wj-btn" aria-label="Italic">
                                    <i class="material-icons">format_italic</i>
                                </button>
                                <button id="underline" class="wj-btn" aria-label="Underline">
                                    <i class="material-icons">format_underline</i>
                                </button>
                                <button id="strikethrough" class="wj-btn" aria-label="Strikethrough">
                                    <i class="material-icons">format_strikethrough</i>
                                </button>
                                <button id="subscript" class="wj-btn" aria-label="Subscript">
                                    <i class="material-icons">vertical_align_bottom</i>
                                </button>
                                <button id="superscript" class="wj-btn" aria-label="Superscript">
                                    <i class="material-icons">vertical_align_top</i>
                                </button>
                            </div>
                        </div>
                        <div class="wj-header">Font</div>
                    </div>
                </div>
            </wj-tab>
            <wj-tab>
                <a>Custom Tab</a>
                <div>
                    <div class="wj-group">
                        <div class="wj-content">
                            <div class="wj-column">
                                <button id="click-me" class="wj-btn wj-btn-large">Click Me</button>
                            </div>
                        </div>
                        <div class="wj-header">Custom Group</div>
                    </div>
                </div>
            </wj-tab>
        </wj-tab-panel>
        <div id="editor" contenteditable="true">
            <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
        </div>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from "vue";
    import * as wijmo from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.nav';

    let App = Vue.extend({
        name: "app",
        methods: {
            _showBkgPicker(e) {
                this._showPicker(this.$refs.bkgPicker, e)
            },
            _showClrPicker(e) {
                this._showPicker(this.$refs.clrPicker, e)
            },
            _showPicker(pickerComponent, e) {
                const el = pickerComponent.$el;
                wijmo.showPopup(el, e.target, false, true, false);
                el.focus();
            },
            _hideColorPicker(colorPicker) {
                wijmo.hidePopup(colorPicker.hostElement);
            },

            _bkgChanged(colorPicker) {
                this._execCommand('backColor', colorPicker.value);
                this._hideColorPicker(colorPicker);
            },
            _clrChanged(colorPicker) {
                this._execCommand('foreColor', colorPicker.value);
                this._hideColorPicker(colorPicker);
            },

            _fontChanged(comboBox) {
                this._execCommand('fontName', comboBox.text);
            },
            _sizeChanged(comboBox) {
                this._execCommand('fontSize', comboBox.selectedIndex + 1);
            },

            _onTabPanelClick(e) {
                switch (e.target.id) {
                    // format group
                    case 'save':
                        localStorage.editorContent = this._editor.innerHTML;
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
                        this._execCommand(e.target.id);
                        break;

                    // font group
                    case 'bold':
                    case 'italic':
                    case 'underline':
                    case 'strikethrough':
                    case 'subscript':
                    case 'superscript':
                        this._execCommand(e.target.id);
                        break;

                    case 'click-me':
                        alert('Wijmo Ribbon Sample');
                }
            },

            _addTooltips(ctl) {
                const tt = new wijmo.Tooltip();
                const els = ctl.querySelectorAll('[aria-label]');
                for (let i = 0; i < els.length; i++) {
                    tt.setTooltip(els[i], els[i].getAttribute('aria-label'));
                }
            },

            _saveSelection() {
                const sel = window.getSelection();
                return sel && sel.rangeCount ? sel.getRangeAt(0) : null;
            },
            _restoreSelection(range) {
                if (range) {
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            },

            _execCommand(cmd, parm) {
                this._editor.focus();
                document.execCommand(cmd, false, parm);
            }
        },

        mounted() {
            this._editor = this.$el.querySelector('#editor');
            this._ribbon = this.$refs.ribbon.$el;
            if (this._editor && this._ribbon) {
            if (localStorage.editorContent) {
                this._editor.innerHTML = localStorage.editorContent;
            }

            this._ribbon.querySelector('.wj-tabheaders').addEventListener('dblclick', e => {
                if (!wijmo.hasClass(e.target, 'wj-tabheader')) {
                    wijmo.toggleClass(this._ribbon, 'hide-content');
                }
            });

            this._addTooltips(this._ribbon);

            this._ribbon.addEventListener('click', this._onTabPanelClick);

            // save/restore editor selection on focus changes
            this._editor.addEventListener('keyup', () => this._selection = this._saveSelection());
            this._editor.addEventListener('mouseup', () => this._selection = this._saveSelection());
            this._editor.addEventListener('focus', () => this._restoreSelection(this._selection));

            }
        },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    .wj-tabpanel {
        max-width: 100%;
    }
    .wj-tabpane {
        white-space: nowrap; /* keep groups on a single line */
    }
    .wj-group {
        display: inline-block;
        border-right: 1px solid #eee;
        padding: 3px 6px 0 3px;
    }
    .wj-group >.wj-header {
        text-align: center;
        background: transparent;
        font-weight: normal;
        font-size: 80%;
        margin-top: 6px;
    }
    .wj-group >.wj-content {
        border: none;
        height: 5.5em;
        overflow: visible;
    }
    .wj-group .wj-column {
        display: inline-block;
        vertical-align: top;
    }
    .wj-group .wj-row {
        margin-bottom: 2px;
    }
    .wj-control .wj-group .wj-content .wj-btn {
        font-weight: normal;
        padding: 5px 12px;
    }
    .wj-group .wj-content .wj-btn.wj-btn-large {
        padding: 2em 1.5em;
    }
    .wj-group .material-icons {
        font-size: 110%;
        padding-top: 2px;
        pointer-events: none;
    }
    .wj-group .wj-dropdown {
        width: 10em;
        border: none;
        background: #eee;
    }
    /* hide ribbon content */
    .wj-tabpanel.hide-content .wj-tabpanes {
        height: 0;
        transition: height linear 400ms;
    }
    .wj-btn,
    .wj-combobox
    {
        margin-right: 3px;
    }
    #editor {
        height: 300px;
        overflow: auto;
        padding: 12px;
        background: #ffe;
        border: 1px solid #ccc;
        margin: 0 12px;
    }
</style>
