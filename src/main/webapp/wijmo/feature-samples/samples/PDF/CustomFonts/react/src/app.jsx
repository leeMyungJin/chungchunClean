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
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.registerFont({
            source: 'resources/fira/FiraSans-Regular.ttf',
            name: 'fira',
            style: 'normal',
            weight: 'normal',
            sansSerif: true
        });
        //
        doc.registerFont({
            source: 'resources/fira/FiraSans-Bold.ttf',
            name: 'fira',
            style: 'normal',
            weight: 'bold',
            sansSerif: true
        });
        //
        doc.drawText('Here is the standard Times font.');
        //
        let font = new pdf.PdfFont('fira');
        doc.drawText('Here is the FiraSans-Regular font.', null, null, { font: font });
        //
        font.weight = 'bold';
        doc.drawText('Here is the FiraSans-Bold font.', null, null, { font: font });
        //
        doc.end();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
