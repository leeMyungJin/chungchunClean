import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.isDisabledChanged = e => {
            this.setState({ isDisabled: e.target.checked || false });
        };
        this.isVisibleChanged = e => {
            this.setState({ isVisible: e.target.checked || false });
        };
        this.state = {
            isDisabled: true,
            isVisible: true,
        };
    }
    render() {
        return (<div>
            <TabPanel selectedIndex={1}>
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
                    <a>America</a>
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
                <Tab isDisabled={this.state.isDisabled}>
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
                <Tab isVisible={this.state.isVisible}>
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
            <div>
                <label htmlFor="disableEurope">Disable Europe</label>
                <input id="disableEurope" type="checkbox" checked={this.state.isDisabled} onChange={this.isDisabledChanged}/>
            </div>
            <div>
                <label htmlFor="showOceania">Show Oceania</label>
                <input id="showOceania" type="checkbox" checked={this.state.isVisible} onChange={this.isVisibleChanged}/>
            </div>
        </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
