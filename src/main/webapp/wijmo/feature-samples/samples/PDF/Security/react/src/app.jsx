import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PdfVersion, PdfPrintPermission, saveBlob, PdfDocument } from '@grapecity/wijmo.pdf';
import '@grapecity/wijmo.pdf.security';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.state = {
            userPassword: undefined,
            ownerPassword: undefined,
            version: PdfVersion.v1_3,
            permissions: {
                annotating: false,
                contentAccessibility: false,
                copying: false,
                documentAssembly: false,
                fillingForms: false,
                modifying: false,
                printing: PdfPrintPermission.NotAllowed
            }
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <div className="panel panel-default">
                <div className="panel-heading">
                    Security settings
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <input type="text" className="form-control" placeholder="User password" onChange={this._userPasswordChange.bind(this)} value={this.state.userPassword}/>
                        </div>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" placeholder="Owner password" onChange={this._ownerPasswordChange.bind(this)} value={this.state.ownerPassword}/>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <wjInput.Menu header='PDF version' itemClicked={this._versionChanged.bind(this)} value={this.state.version}>
                                <wjInput.MenuItem value={PdfVersion.v1_3}>1.3</wjInput.MenuItem>
                                <wjInput.MenuItem value={PdfVersion.v1_4}>1.4</wjInput.MenuItem>
                                <wjInput.MenuItem value={PdfVersion.v1_5}>1.5</wjInput.MenuItem>
                                <wjInput.MenuItem value={PdfVersion.v1_6}>1.6</wjInput.MenuItem>
                                <wjInput.MenuItem value={PdfVersion.v1_7}>1.7</wjInput.MenuItem>
                                <wjInput.MenuItem value={PdfVersion.v1_7Ext3}>1.7 ExtensionLevel 3</wjInput.MenuItem>
                            </wjInput.Menu>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <b>Permissions</b> (require owner password)
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.permissions.annotating} onChange={this._permChanged.bind(this, 'annotating')}/>Annotating
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.permissions.contentAccessibility} onChange={this._permChanged.bind(this, 'contentAccessibility')}/>ContentAccessibility
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.permissions.copying} onChange={this._permChanged.bind(this, 'copying')}/>Copying
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.permissions.documentAssembly} onChange={this._permChanged.bind(this, 'documentAssembly')}/>DocumentAssembly
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.permissions.fillingForms} onChange={this._permChanged.bind(this, 'fillingForms')}/>FillingForms
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.permissions.modifying} onChange={this._permChanged.bind(this, 'modifying')}/>Modifying
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">Printing</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="radio-inline">
                                <input name="printing" type="radio" value={PdfPrintPermission.NotAllowed} checked={this.state.permissions.printing == PdfPrintPermission.NotAllowed} onChange={this._printingChanged.bind(this)}/>NotAllowed
                            </label>
                            <label className="radio-inline">
                                <input name="printing" type="radio" value={PdfPrintPermission.AllowLowResolution} checked={this.state.permissions.printing == PdfPrintPermission.AllowLowResolution} onChange={this._printingChanged.bind(this)}/>AllowLowResolution
                            </label>
                            <label className="radio-inline">
                                <input name="printing" type="radio" value={PdfPrintPermission.AllowHighResolution} checked={this.state.permissions.printing == PdfPrintPermission.AllowHighResolution} onChange={this._printingChanged.bind(this)}/>AllowHighResolution
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-default" onClick={this._drawPdf.bind(this)}>Draw PDF</button>
        </div>;
    }
    //
    _drawPdf() {
        let s = this.state, p = s.permissions, doc = new PdfDocument({
            userPassword: s.userPassword,
            ownerPassword: s.ownerPassword,
            version: s.version,
            permissions: {
                annotating: p.annotating,
                contentAccessibility: p.contentAccessibility,
                copying: p.copying,
                documentAssembly: p.documentAssembly,
                fillingForms: p.fillingForms,
                modifying: p.modifying,
                printing: p.printing
            },
            ended: (doc, args) => saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.drawText('Demo page.');
        //
        doc.end();
    }
    //
    _userPasswordChange(event) {
        this.setState({ userPassword: event.target.value });
    }
    //
    _ownerPasswordChange(event) {
        this.setState({ ownerPassword: event.target.value });
    }
    //
    _versionChanged(menu) {
        if (menu.selectedValue) {
            this.setState({ version: menu.selectedValue });
        }
    }
    //
    _permChanged(stateProp, event) {
        let val = event.target.checked;
        this.setState((state) => {
            state.permissions[stateProp] = val;
            return state;
        });
    }
    //
    _printingChanged(event) {
        let val = event.target.value;
        this.setState((state) => {
            state.permissions.printing = val;
            return state;
        });
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
