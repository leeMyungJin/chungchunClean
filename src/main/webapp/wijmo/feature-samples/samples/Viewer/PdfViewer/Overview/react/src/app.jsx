import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as viewer from '@grapecity/wijmo.viewer';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjViewer from '@grapecity/wijmo.react.viewer';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._mouseModeOptions = ['SelectTool', 'MoveTool', 'RubberbandTool', 'MagnifierTool'];
        //
        this.state = {
            viewMode: viewer.ViewMode.Single,
            mouseMode: viewer.MouseMode.SelectTool,
            fullScreen: false,
            zoomFactor: 1
        };
    }
    //
    render() {
        return <div className="container-fluid">

            <div className="col-md-12">
                <div className="row">
                    <wjViewer.PdfViewer filePath="PdfRoot/DefaultDocument.pdf" viewMode={this.state.viewMode} mouseMode={this.state.mouseMode} fullScreen={this.state.fullScreen} zoomFactor={this.state.zoomFactor} viewModeChanged={this.viewModeChanged.bind(this)} fullScreenChanged={this.fullScreenChanged.bind(this)} zoomFactorChanged={this.zoomFactorChanged.bind(this)} serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.5.20193.222/api/pdf">
                    </wjViewer.PdfViewer>
                </div>

                <br />

                <div className="row">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-md-3">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" checked={this.state.viewMode} onChange={this.viewModeCheckedChanged.bind(this)}/>
                                        Continuous View Mode
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <wjInput.Menu value={this.state.mouseMode} header='Mouse mode' itemClicked={this.mouseModeChanged.bind(this)}>
                                    <wjInput.MenuItem value={viewer.MouseMode.SelectTool}>
                                        SelectTool
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={viewer.MouseMode.MoveTool}>
                                        MoveTool
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={viewer.MouseMode.RubberbandTool}>
                                        RubberbandToo
                                    </wjInput.MenuItem>
                                    <wjInput.MenuItem value={viewer.MouseMode.MagnifierTool}>
                                        MagnifierTool
                                    </wjInput.MenuItem>
                                </wjInput.Menu>
                            </div>
                            <div className="col-md-2">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" checked={this.state.fullScreen} onChange={this.fullScreenCheckedChanged.bind(this)}/> Full Screen
                                    </label>
                                </div>
                            </div>
                            <div className="col-mod-4">
                                <label className="col-md-2 control-label">Zoom Factor</label>
                                <div className="col-md-2">
                                    <wjInput.InputNumber value={this.state.zoomFactor} min={0.05} max={10} step={0.1} format="n2" valueChanged={this.zoomFactorValueChanged.bind(this)}>
                                    </wjInput.InputNumber>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
    //
    viewModeChanged(sender) {
        this.setState({ viewMode: sender.viewMode });
    }
    //
    viewModeCheckedChanged() {
        if (this.state.viewMode === viewer.ViewMode.Single) {
            this.setState({ viewMode: viewer.ViewMode.Continuous });
        }
        else {
            this.setState({ viewMode: viewer.ViewMode.Single });
        }
    }
    //
    mouseModeChanged(sender) {
        this.setState({ mouseMode: sender.selectedValue });
    }
    //
    fullScreenChanged(sender) {
        this.setState({ fullScreen: sender.fullScreen });
    }
    //
    fullScreenCheckedChanged() {
        this.setState({ fullScreen: !this.state.fullScreen });
    }
    //
    zoomFactorChanged(sender) {
        this.setState({ zoomFactor: sender.zoomFactor });
    }
    //
    zoomFactorValueChanged(sender) {
        this.setState({ zoomFactor: sender.value });
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
