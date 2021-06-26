import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import { ComboBox } from '@grapecity/wijmo.react.input';
import * as wjCore from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.tabPositions = 'Left,Right,Above,Below'.split(',');
        this.tabAligns = 'Left,Center,Right'.split(',');
        this.positionSelected = e => {
            const selectedIndex = e.selectedIndex;
            this.tabPositions.forEach((pos, index) => {
                wjCore.toggleClass(this.host, `tabs-${pos.toLowerCase()}`, index == selectedIndex);
            });
        };
        this.alignChanged = e => {
            this.host.querySelector('.wj-tabheaders').style.textAlign = e.selectedItem;
        };
        this.isAnimatedChanged = e => {
            this.setState({ isAnimated: e.target.checked });
        };
        this.customHeadersChanged = e => {
            this.setState({ customHeaders: e.target.checked }, () => {
                wjCore.toggleClass(this.host, 'custom-headers', this.state.customHeaders);
            });
        };
        this.state = {
            isAnimated: true,
            customHeaders: false,
        };
        this.tabPanel = React.createRef();
    }
    componentDidMount() {
        const tabPanel = this.tabPanel.current;
        this.host = (tabPanel && ReactDOM.findDOMNode(tabPanel));
    }
    render() {
        return (<div>
                <TabPanel ref={this.tabPanel} isAnimated={this.state.isAnimated}>
                    <Tab>
                        <a>Africa</a>
                        <div>
                            <ul>
                                <li>Algeria</li>
                                <li>Angola</li>
                                <li>Benin</li>
                                <li>Botswana</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab>
                        <a>
                        America
                        </a>
                        <div>
                            <ul>
                                <li>Canada</li>
                                <li>Chile</li>
                                <li>Mexico</li>
                                <li>United States</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab>
                        <a>Asia</a>
                        <div>
                            <ul>
                                <li>China</li>
                                <li>Korea</li>
                                <li>India</li>
                                <li>Japan</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab>
                        <a>Europe</a>
                        <div>
                            <ul>
                                <li>Austria</li>
                                <li>England</li>
                                <li>France</li>
                                <li>Germany</li>
                                <li>Netherlands</li>
                                <li>Switzerland</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab>
                        <a>Oceania</a>
                        <div>
                            <ul>
                                <li>Australia</li>
                                <li>Fiji</li>
                                <li>New Zealand</li>
                                <li>Samoa</li>
                            </ul>
                        </div>
                    </Tab>
                </TabPanel>
                <h4>Options</h4>
                <div>
                    <label htmlFor="tabPosition">Tab Position</label>
                    <ComboBox id="tabPosition" itemsSource={this.tabPositions} selectedIndex={2} selectedIndexChanged={this.positionSelected}/>
                </div>
                <div>
                    <label htmlFor="tabAlign">Tab Alignment</label>
                    <ComboBox id="tabAlign" itemsSource={this.tabAligns} selectedIndexChanged={this.alignChanged}/>
                </div>
                <div>
                    <label htmlFor="isAnimated">isAnimated</label>
                    <input id="isAnimated" type="checkbox" checked={this.state.isAnimated} onChange={this.isAnimatedChanged}/>
                </div>
                <div>
                    <label htmlFor="customHeaders">Custom Headers</label>
                    <input id="customHeaders" type="checkbox" checked={this.state.customHeaders} onChange={this.customHeadersChanged}/>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
