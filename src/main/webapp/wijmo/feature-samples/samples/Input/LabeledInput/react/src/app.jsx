import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { ComboBox, InputMask, InputDate, InputTime, InputNumber, MultiSelect } from '@grapecity/wijmo.react.input';
import { Control, isUndefined } from '@grapecity/wijmo';
//
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.countries = 'US,UK,Japan,Germany,France,Italy,Russia,China'.split(',');
        this.colors = 'Black,White,Grey,Red,Green,Blue'.split(',');
    }
    // handle form submit and reset events
    submit(e) {
        e.preventDefault();
        e.target.reset();
        alert('The form has been submitted.');
    }
    reset(e) {
        let ctls = e.target.querySelectorAll('.wj-control');
        for (let i = 0; i < ctls.length; i++) {
            let ctl = Control.getControl(ctls[i]);
            if (!isUndefined(ctl.selectedIndex) && ctl.itemsSource != null) {
                ctl.selectedIndex = -1;
            }
            if (!isUndefined(ctl.checkedItems)) {
                ctl.checkedItems = [];
            }
        }
    }
    render() {
        return <div className="container-fluid wj-popup">
            <form id="theForm" className="wj-dialog" onSubmit={e => this.submit(e)} onReset={e => this.reset(e)}>
                <div className="wj-dialog-header" tabIndex={-1}>
                    Labeled Input
                </div>
                <div className="wj-dialog-body">
                    <div>
                        Styled Input Controls
                    </div>

                    
                    <div className="wj-labeled-input">
                        <ComboBox id="name" autocomplete="name" required/>
                        <label htmlFor="name">Name</label>
                        <div className="wj-error" tabIndex={-1}>We do need your name...</div>
                    </div>
                    <div className="wj-labeled-input wide">
                        <ComboBox id="email" autocomplete="email" required pattern="\S+@\S+\.\S+"/>
                        <label htmlFor="email">E-mail</label>
                        <div className="wj-error" tabIndex={-1}>We need a valid e-mail...</div>
                    </div>
                    <div className="wj-labeled-input">
                        <ComboBox id="country" itemsSource={this.countries} isRequired={false} isEditable={true} text=""/>
                        <label htmlFor="country">Country</label>
                    </div>
                    <div className="wj-labeled-input">
                        <InputMask id="card" autocomplete="cc-number" pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" mask="9999 9999 9999 9999" isRequired={false} value={null}/>
                        <label htmlFor="card">Credit Card #</label>
                        <div className="wj-error" tabIndex={-1}>Four groups of four digits...</div>
                    </div>

                    
                    <br />
                    <div className="wj-labeled-input">
                        <InputDate id="date" isRequired={false} value={null}/>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="wj-labeled-input">
                        <InputTime id="time" isRequired={false} min="8:00" max="18:00" value={null}/>
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="wj-labeled-input">
                        <InputNumber id="qty" isRequired={false} format="n0" step={1} value={null}/>
                        <label htmlFor="quantity">Quantity</label>
                    </div>
                    <div className="wj-labeled-input">
                        <InputNumber id="discount" isRequired={false} format="p0" min={0} max={.2} step={.05} value={null}/>
                        <label htmlFor="discount">Discount</label>
                    </div>
                    <div className="wj-labeled-input">
                        <MultiSelect id="colors" itemsSource={this.colors} headerFormat="{count:n0} favorite colors"/>
                        <label htmlFor="colors">Favorite Colors</label>
                    </div>

                    <div>
                        Styled Checkboxes, Radio Buttons, and Switches
                    </div>
                    <div className="wj-labeled-input">
                        <input id="theCheckboxForm" type="checkbox" defaultChecked={true}/>
                        <label htmlFor="theCheckboxForm">Checkbox</label>
                    </div>
                    <div className="wj-labeled-input switch">
                        <input id="theSwitchForm" type="checkbox"/>
                        <label htmlFor="theSwitchForm">Switch</label>
                    </div>
                    <br />
                    <div className="wj-labeled-input">
                        <input id="btnRed" type="radio" name="color" defaultChecked={true}/>
                        <label htmlFor="btnRed">Red</label>
                    </div>
                    <div className="wj-labeled-input">
                        <input id="btnGreen" type="radio" name="color"/>
                        <label htmlFor="btnGreen">Green</label>
                    </div>
                    <div className="wj-labeled-input">
                        <input id="btnBlue" type="radio" name="color"/>
                        <label htmlFor="btnBlue">Blue</label>
                    </div>
                </div>
                <div className="wj-dialog-footer">
                    <button className="btn btn-primary" type="submit">OK</button>
                    <button className="btn btn-default wj-hide-cancel" type="reset">Cancel</button>
                </div>
            </form>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
