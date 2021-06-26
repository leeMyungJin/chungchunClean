import 'bootstrap.css';
import "@grapecity/wijmo.styles/wijmo.css";
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import * as wjOdata from '@grapecity/wijmo.odata';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsInfo: [],
        };
    }
    componentDidMount() {
        const headers = 'Employees,Categories,Products,Customers'.split(',');
        const url = 'https://services.odata.org/Northwind/Northwind.svc/';
        const tabsInfo = [];
        headers.forEach((header) => {
            tabsInfo.push({
                header: header,
                data: new wjOdata.ODataCollectionView(url, header, { sortOnServer: false }),
            });
        });
        this.setState({ tabsInfo });
    }
    render() {
        return (<TabPanel>
                {this.state.tabsInfo.map((tab, idx) => (<Tab key={idx}>
                        <a>{tab.header}</a>
                        <div>
                            <FlexGrid isReadOnly={true} itemsSource={tab.data}/>
                        </div>
                    </Tab>))}
            </TabPanel>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
