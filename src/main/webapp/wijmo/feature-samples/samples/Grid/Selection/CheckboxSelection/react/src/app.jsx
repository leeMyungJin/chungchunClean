import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { HeadersVisibility } from "@grapecity/wijmo.grid";
import { CollectionView, PropertyGroupDescription } from "@grapecity/wijmo";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.selector = null;
        this.state = {
            view: new CollectionView(getData(30)),
            grouped: true,
            headers: true,
            selectedItems: []
        };
    }
    initGrid(grid) {
        this.setGroups(true);
        this.selector = new Selector(grid, {
            itemChecked: (s, e) => {
                this.setState({
                    selectedItems: grid.rows.filter(r => r.isSelected)
                });
            }
        });
    }
    setGroups(groupsOn) {
        let groups = this.state.view.groupDescriptions;
        groups.clear();
        if (groupsOn) {
            groups.push(new PropertyGroupDescription('country'), new PropertyGroupDescription('product'));
        }
        this.setState({
            grouped: groupsOn
        });
    }
    setHeaders(headersOn) {
        let theGrid = this.selector.column.grid;
        theGrid.headersVisibility = headersOn
            ? HeadersVisibility.All
            : HeadersVisibility.Column;
        this.selector.column = headersOn
            ? theGrid.rowHeaders.columns[0]
            : theGrid.columns[0];
        this.setState({
            headers: headersOn
        });
    }
    render() {
        return <div className="container-fluid">
            <label>
                Grouped Data{' '}
                <input type="checkbox" checked={this.state.grouped} onChange={e => this.setGroups(e.target.checked)}/>
            </label>
            <label>
                Header Column{' '}
                <input type="checkbox" checked={this.state.headers} onChange={e => this.setHeaders(e.target.checked)}/>
            </label>
            <p>
                There are now <b>{this.state.selectedItems.length}</b> items selected.
            </p>
            <FlexGrid deferResizing={true} showMarquee={true} alternatingRowStep={0} itemsSource={this.state.view} initialized={s => this.initGrid(s)}>
                <FlexGridColumn binding="id" header="ID" isReadOnly={true}/>
                <FlexGridColumn binding="country" header="Country"/>
                <FlexGridColumn binding="product" header="Product"/>
                <FlexGridColumn binding="discount" header="Discount" format="p0"/>
                <FlexGridColumn binding="downloads" header="Downloads"/>
                <FlexGridColumn binding="sales" header="Sales"/>
                <FlexGridColumn binding="expenses" header="Expenses"/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
