import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.selectedIndexChanged = control => {
            this.setState({ selectedTabContent: `Content for tab <b>${control.selectedTab.header.textContent}</b>...` });
        };
        this.state = {
            selectedTabContent: '',
        };
        this.tabPanel = React.createRef();
    }
    componentDidMount() {
        this.selectedIndexChanged(this.tabPanel.current.control);
    }
    render() {
        return (<div>
            <TabPanel ref={this.tabPanel} selectedIndex={1} selectedIndexChanged={this.selectedIndexChanged}>
                <Tab>
                    <a>Africa</a>
                    <div>
                    </div>
                </Tab>
                <Tab>
                    <a>America</a>
                    <div>
                    </div>
                </Tab>
                <Tab>
                    <a>Asia</a>
                    <div>
                    </div>
                </Tab>
                <Tab>
                    <a>Europe</a>
                    <div>
                    </div>
                </Tab>
                <Tab>
                    <a>Oceania</a>
                    <div>
                    </div>
                </Tab>
            </TabPanel>
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 id="detachedContent" className="panel-title" dangerouslySetInnerHTML={{ __html: this.state.selectedTabContent }}></h3>
                </div>
            </div>
        </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
