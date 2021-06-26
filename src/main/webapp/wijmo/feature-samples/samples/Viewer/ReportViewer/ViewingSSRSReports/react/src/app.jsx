import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjViewer from '@grapecity/wijmo.react.viewer';
import { getReports } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.reports = getReports();
        this.state = {
            categories: this.reports.categories,
            filePath: 'c1ssrs/' + this.reports.selectedReport.categoryName + "/" + this.reports.selectedReport.reportName
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row report-names">
                <label>Selected SSRS Report:</label>
                <select id="reports" className="combobox" value={this.state.filePath} onChange={this.onFilePathChanged.bind(this)}>
                {this.state.categories.map(function (cat) {
            return <optgroup key={cat.name} label={cat.text}>
                            {cat.reports.map(function (rep) {
                return <option key={rep.reportPath} value={'c1ssrs/' + rep.reportPath}>
                                        {rep.reportTitle}
                                    </option>;
            })}
                        </optgroup>;
        })}
                </select>
            </div>

            <wjViewer.ReportViewer filePath={this.state.filePath} serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.5.20193.222/api/report">
            </wjViewer.ReportViewer>      
        </div>;
    }
    onFilePathChanged(e) {
        console.log("onFilePathChanged " + e.target.value);
        this.setState({
            filePath: e.target.value
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
