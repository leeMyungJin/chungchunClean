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
        let reports = getReports();
        let filePath = reports.categories.filter(cat => cat.name === reports.selectedReport.categoryName)[0]
            .reports.filter(rep => rep.reportName === reports.selectedReport.reportName)[0]
            .filePath;
        this._categories = reports.categories;
        this.state = { filePath: filePath };
    }
    render() {
        return <div className="container-fluid">
            <div className="row report-names">
                <label>
                    Selected ActiveReports Report:
                    <select id="reports" className="combobox" value={this.state.filePath} onChange={this._filePathChanged.bind(this)}>
                        {this._categories.map(cat => {
            return <optgroup key={cat.name} label={cat.name}>
                                    {cat.reports.map(rep => {
                return <option key={rep.filePath} value={rep.filePath}>
                                                {rep.reportName}
                                            </option>;
            })}
                                </optgroup>;
        })}
                    </select>
                </label>
            </div>

            <wjViewer.ReportViewer filePath={this.state.filePath} serviceUrl="https://ardemos.grapecity.com/AR12-ReportsGallery/ActiveReports.ReportService.asmx">
            </wjViewer.ReportViewer>
        </div>;
    }
    _filePathChanged(e) {
        this.setState({ filePath: e.target.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
