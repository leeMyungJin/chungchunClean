import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Accordion, AccordionPane } from '@grapecity/wijmo.react.nav';
//
//
class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.onChange = (event) => {
            const target = event.target;
            const key = target.id;
            const checked = !!target.checked;
            this.setState((state) => ({
                [key]: checked,
            }));
        };
        this.state = {
            showIcons: true,
            autoSwitch: true,
            isAnimated: true,
            allowCollapseAll: false,
            allowExpandMany: false,
        };
    }
    //
    render() {
        return (<div className="container-fluid">
                <Accordion showIcons={this.state.showIcons} autoSwitch={this.state.autoSwitch} isAnimated={this.state.isAnimated} allowCollapseAll={this.state.allowCollapseAll} allowExpandMany={this.state.allowExpandMany}>
                    <AccordionPane>
                        <div className="main-pane">
                            Accordion
                            <div className="desc">
                                Change the properties of this Accordion.
                            </div>
                        </div>
                        <div>
                            <div className="wj-labeled-input switch">
                                <input id="showIcons" type="checkbox" checked={this.state.showIcons} onChange={this.onChange}/>
                                <label htmlFor="showIcons">
                                    showIcons <span>in the pane headers</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="autoSwitch" type="checkbox" checked={this.state.autoSwitch} onChange={this.onChange}/>
                                <label htmlFor="autoSwitch">
                                    autoSwitch <span>expand panes when selecting with the keyboard</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="isAnimated" type="checkbox" checked={this.state.isAnimated} onChange={this.onChange}/>
                                <label htmlFor="isAnimated">
                                    isAnimated <span>animate pane collapse/expand</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="allowCollapseAll" type="checkbox" checked={this.state.allowCollapseAll} onChange={this.onChange}/>
                                <label htmlFor="allowCollapseAll">
                                    allowCollapseAll <span>can collapse all panes</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="allowExpandMany" type="checkbox" checked={this.state.allowExpandMany} onChange={this.onChange}/>
                                <label htmlFor="allowExpandMany">
                                    allowExpandMany <span>can expand multiple panes</span>
                                </label>
                            </div>
                        </div>
                    </AccordionPane>
                    <AccordionPane>
                        <div>
                            Network &amp; Internet
                            <div className="desc">
                                Wi-Fi, mobile, data usage, and hotspot
                            </div>
                        </div>
                        <div>
                            <div className="wj-labeled-input switch">
                                <input id="wifi" type="checkbox" defaultChecked/>
                                <label htmlFor="wifi">
                                    Wi-Fi <span>turn wi-fi on or off</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="apmode" type="checkbox"/>
                                <label htmlFor="apmode">
                                    Airplane Mode <span>turn airplane mode on or off</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="hotspot" type="checkbox"/>
                                <label htmlFor="hotspot">
                                    Hot Spot &amp; Tethering <span>hotspot on, tethering</span>
                                </label>
                            </div>
                        </div>
                    </AccordionPane>
                    <AccordionPane>
                        <div>
                            Connected Devices
                            <div className="desc">
                                Bluetooth, NFC
                            </div>
                        </div>
                        <div>
                            <div className="wj-labeled-input switch">
                                <input id="dev1" type="checkbox"/>
                                <label htmlFor="dev1">
                                    Gear Fit2 Pro <span>health monitor</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="dev2" type="checkbox"/>
                                <label htmlFor="dev2">
                                    SYNC <span>car connection</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="dev3" type="checkbox"/>
                                <label htmlFor="dev3">
                                    Samsung XT-9343 <span>TV</span>
                                </label>
                            </div>
                            <button className="btn btn-primary">
                                See all 8 devices...
                            </button>
                        </div>
                    </AccordionPane>
                    <AccordionPane>
                        <div>
                            Apps &amp; Notifications
                            <div className="desc">
                                Recent apps, default apps
                            </div>
                        </div>
                        <div>
                            <div className="wj-labeled-input switch">
                                <input id="app-chrome" type="checkbox"/>
                                <label htmlFor="app-chrome">
                                    Chrome <span>web browser</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="app-outlook" type="checkbox"/>
                                <label htmlFor="app-outlook">
                                    Outlook <span>mail and schedule</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="app-fb" type="checkbox"/>
                                <label htmlFor="app-fb">
                                    Facebook <span>social media</span>
                                </label>
                            </div>
                            <button className="btn btn-primary">
                                See all 62 apps...
                            </button>
                        </div>
                    </AccordionPane>
                    <AccordionPane>
                        <div>
                            Battery
                            <div className="desc">
                                67% - Should last until about 9:30 PM
                            </div>
                        </div>
                        <div>
                            <div className="wj-labeled-input switch">
                                <input id="bat-sav" type="checkbox"/>
                                <label htmlFor="bat-sav">
                                    Battery Saver <span>slow down to reduce battery usage</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="bat-adapt" type="checkbox"/>
                                <label htmlFor="bat-adapt">
                                    Adaptive Battery <span>detect when apps drain battery</span>
                                </label>
                            </div>
                            <div className="wj-labeled-input switch">
                                <input id="bat-pct" type="checkbox"/>
                                <label htmlFor="bat-pct">
                                    Battery Percentage <span>show battery percentage</span>
                                </label>
                            </div>
                        </div>
                    </AccordionPane>
                </Accordion>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
