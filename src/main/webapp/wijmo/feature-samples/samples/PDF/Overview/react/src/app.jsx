import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as pdf from "@grapecity/wijmo.pdf";
class App extends React.Component {
    render() {
        return <div className="container-fluid">
            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>
        </div>;
    }
    exportPDF() {
        let doc = new pdf.PdfDocument({
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.drawText('Demo page.');
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
