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
            ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
        });
        //
        doc.drawText('This text uses the default document font, Times 10.');
        //
        doc.drawText('This text uses Times Bold Oblique 20.', null, null, { font: new pdf.PdfFont('times', 20, 'oblique', 'bold') });
        //
        doc.setFont(new pdf.PdfFont('helvetica'));
        doc.drawText('This text uses Helvetica 10.');
        doc.drawText('This text also uses Helvetica 10.');
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
