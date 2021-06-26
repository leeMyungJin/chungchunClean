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
            header: {
                height: 0 // no header 
            },
            footer: {
                height: 0 // no footer
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        let image = 'resources/wijmo1.png';
        //
        doc.drawText('This image is rendered in its original size:');
        doc.drawImage(image);
        doc.moveDown();
        //
        doc.drawText('This image is scaled to fit the width of 100:');
        doc.drawImage(image, null, null, { width: 100 });
        doc.moveDown();
        //
        doc.drawText('This image is scaled to fit the height of 25:');
        doc.drawImage(image, null, null, { height: 25 });
        doc.moveDown();
        //
        doc.drawText('This image is stretched to fit a rectangle of dimensions 100x25:');
        doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
        doc.drawImage(image, null, null, {
            width: 100,
            height: 25
        });
        doc.moveDown();
        //
        doc.drawText('This image is centered and stretched proportionally to fit a rectangle of dimensions 100x25:');
        doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
        doc.drawImage(image, null, null, {
            width: 100,
            height: 25,
            stretchProportionally: true,
            align: pdf.PdfImageHorizontalAlign.Center
        });
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
