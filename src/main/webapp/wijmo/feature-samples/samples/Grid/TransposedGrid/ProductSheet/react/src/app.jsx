import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { TransposedGrid, TransposedGridRow } from '@grapecity/wijmo.react.grid.transposed';
import { ObservableArray } from '@grapecity/wijmo';
import { getData, getDataColumns } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new ObservableArray(getData()),
            columns: getDataColumns()
        };
    }
    // customize cells to show product images and star rating
    formatItem(s, e) {
        if (e.panel == s.cells) {
            // get binding from row if possible, then from column
            let binding = s.rows[e.row].binding || s.columns[e.col].binding;
            switch (binding) {
                // product image
                case 'img':
                    e.cell.innerHTML = '<img src="{img}" draggable="false"/>'.replace('{img}', e.cell.textContent);
                    break;
                // stars for rating
                case 'rating':
                    let rating = s.getCellData(e.row, e.col, false), html = new Array(Math.floor(rating) + 1).join('&#x2605;');
                    if (rating > Math.floor(rating)) {
                        html += '&#9734;'; // white star (half star doesn't work...)
                    }
                    e.cell.innerHTML = '<span class="rating">' + html + '</span>';
                    break;
            }
        }
    }
    // customize transposed product grid row/column sizes
    loadedRows(s) {
        s.columns.defaultSize = 200;
        setTimeout(() => {
            s.autoSizeColumn(0, true, 10); // auto-size row headers
            s.autoSizeRows(); // auto-size data rows
            s.rows[0].height = 180; // make product images large
        });
    }
    render() {
        return <div className="container-fluid">
            <h2>
                Default Grid
            </h2>
            <p>
                Products are rendered as rows.
            </p>
            <FlexGrid className="product-grid" autoGenerateColumns={false} alternatingRowStep={0} showSelectedHeaders='Row' headersVisibility='Row' isReadOnly={true} copyHeaders='Row' selectionMode='CellRange' formatItem={this.formatItem} columns={this.state.columns} itemsSource={this.state.data}/>
            <h2>
                Transposed Grid
            </h2>
            <p>
                Products are rendered as columns.
            </p>
            <TransposedGrid className="product-grid" alternatingRowStep={0} showSelectedHeaders='Row' headersVisibility='Row' isReadOnly={true} copyHeaders='Row' selectionMode='CellRange' formatItem={this.formatItem} loadedRows={this.loadedRows} itemsSource={this.state.data}>
                    {this.state.columns.map(c => <TransposedGridRow binding={c.binding} header={c.header} align={c.align} format={c.format} wordWrap={c.wordWrap}/>)}
            </TransposedGrid>
            
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
