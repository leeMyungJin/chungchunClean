import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as pdf from "@grapecity/wijmo.pdf";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="container-fluid">
            
            <button className="btn btn-default" onClick={this.exportPDF.bind(this)}>Export</button>
        </div>;
    }
    exportPDF() {
        let doc = new pdf.PdfDocument({
            header: {
                declarative: {
                    text: '\tTitle\t&[Page]',
                    font: new pdf.PdfFont('helvetica', 10, 'normal', 'bold')
                }
            },
            footer: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]',
                    brush: '#3173c0',
                    font: new pdf.PdfFont('helvetica', 10, 'normal', 'bold')
                }
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.drawText('Lorem ipsum');
        //
        doc.addPage();
        doc.drawText('Lorem ipsum');
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
