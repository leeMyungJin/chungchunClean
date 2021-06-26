import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
class App extends React.Component {
    render() {
        return (<TabPanel selectedIndex={1}>
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
            </TabPanel>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
