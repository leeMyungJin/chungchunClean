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
        this.categories = this.reports.categories;
        let selectedReport = this.reports.selectedReport;
        this.state = {
            filePath: `${selectedReport.categoryName}/${selectedReport.reportName}.flxr`,
            reportName: selectedReport.reportName,
            reportInfo: `${selectedReport.categoryName}/${selectedReport.reportName}.flxr*${selectedReport.reportName}`
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row report-names">
                <label>Selected FlexReport Report:</label>
                <select id="reports" className="combobox" value={this.state.reportInfo} onChange={this.onReportInfoChanged.bind(this)}>
                {this.categories.map(function (cat) {
            return <optgroup key={cat.name} label={cat.text}>
                            {cat.reports.map(function (rep) {
                return <option key={rep.fileName} value={cat.name + '/' + rep.fileName + '*' + rep.reportName}>
                                        {rep.reportTitle}
                                    </option>;
            })}
                        </optgroup>;
        })}
                </select>
            </div>

            <wjViewer.ReportViewer filePath={'ReportsRoot/' + this.state.filePath} reportName={this.state.reportName} paginated={true} serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.5.20193.222/api/report">
            </wjViewer.ReportViewer>      
        </div>;
    }
    onReportInfoChanged(e) {
        let info = e.target.value.split('*');
        this.setState({
            filePath: info[0],
            reportName: info[1],
            reportInfo: info[0] + "*" + info[1]
        });
        console.log("onReportInfoChanged " + info[0] + "||||" + info[1]);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
