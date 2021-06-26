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
            pageSettings: {
                layout: pdf.PdfPageOrientation.Portrait,
                size: pdf.PdfPageSize.Letter,
                margins: {
                    left: 72,
                    top: 72,
                    right: 72,
                    bottom: 72
                }
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        // stroke areas
        doc.header.paths
            .rect(0, 0, doc.header.width, doc.header.height)
            .stroke();
        //
        doc.paths
            .rect(0, 0, doc.width, doc.height)
            .stroke();
        //
        doc.footer.paths
            .rect(0, 0, doc.footer.width, doc.footer.height)
            .stroke();
        //
        // write descriptions
        doc.header.drawText('Header');
        doc.drawText('Body');
        doc.footer.drawText('Footer');
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
