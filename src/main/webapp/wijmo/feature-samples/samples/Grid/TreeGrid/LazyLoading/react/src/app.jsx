import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { createNode, getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            rowCountText: ''
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.data} headersVisibility="Column" groupCollapsedChanged={this.onGroupCollapsedChanged.bind(this)} initialized={this.initialGrid.bind(this)} childItemsPath="children">
                <wjcGrid.FlexGridColumn binding="name" header="Customer Name" with="*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="id" header="ID" align="center" css-class="id-column"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
            <p>
                The grid currently has <b id="rowCount"></b> rows.
            </p>
        </div>;
    }
    componentDidMount() {
        this.grid.collapseGroupsToLevel(0);
        this._updateRowCount(this.grid);
    }
    initialGrid(grid) {
        this.grid = grid;
    }
    onGroupCollapsedChanged(s, e) {
        let row = s.rows[e.row], item = row.dataItem;
        // did we just expand a node with a dummy child?
        if (!row.isCollapsed && item.children.length == 1 && item.children[0].name == '') {
            // can't lazy load while updating rows
            if (s.rows.isUpdating) {
                row.isCollapsed = true;
                return;
            }
            // replace the dummy child with actual nodes
            item.children.length = 0;
            let cnt = Math.round(Math.random() * 5) + 1;
            for (let i = 0; i < cnt; i++) {
                let node = createNode();
                item.children.push(node);
            }
            // refresh the view
            s.collectionView.refresh();
            // collapse the new item's child items
            for (let i = row.index + 1; i < s.rows.length; i++) {
                let childRow = s.rows[i];
                if (childRow.level <= row.level) {
                    break;
                }
                childRow.isCollapsed = true;
            }
            // update row count
            this._updateRowCount(s);
        }
    }
    _updateRowCount(grid) {
        this.setState({
            rowCountText: wjcCore.Globalize.format(grid.rows.length, 'n0')
        }, () => {
            const node = document.querySelectorAll('#rowCount')[0];
            node.innerHTML = this.state.rowCountText;
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
