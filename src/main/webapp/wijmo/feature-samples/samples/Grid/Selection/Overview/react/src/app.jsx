import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
import * as wjcInput from "@grapecity/wijmo.react.input";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            comboBoxData: "None,Cell,CellRange,Row,RowRange,ListBox".split(","),
            currentSelection: null,
            currentComboText: "CellRange"
        };
    }
    render() {
        return <div className="container-fluid">
            <label>selectionMode{' '}<span id="selectionMode"></span>
                <wjcInput.ComboBox initialized={this.initCombo.bind(this)} itemsSource={this.state.comboBoxData} text={this.state.currentComboText} textChanged={this.onTextChanged.bind(this)}>
                </wjcInput.ComboBox>
            </label>
            <wjcGrid.FlexGrid alternatingRowStep={0} itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)} selectionChanged={this.onSelectionChanged.bind(this)}></wjcGrid.FlexGrid>
            <p>
                Current selection: <span id="currSel">{this.state.currentSelection}</span>.
            </p>
            <div>
                <button className="btn btn-default" onClick={this.onSelectClick.bind(this)}>Select the first four cells</button>
                <button className="btn btn-default" onClick={this.onListSelectClick.bind(this)}>Select rows 0, 2, and 4</button>
            </div>
        </div>;
    }
    initCombo(combo) {
        this.combo = combo;
    }
    initializeGrid(flexGrid) {
        this.flexGrid = flexGrid;
        this.flexGrid.onSelectionChanged(null);
    }
    onTextChanged() {
        console.log("before============" + this.combo.selectedIndex);
        this.flexGrid.selectionMode = wjcCore.asEnum(this.combo.selectedIndex, wjGrid.SelectionMode);
        this.setState({
            currentComboText: wjcCore.asEnum(this.combo.selectedIndex, wjGrid.SelectionMode)
        });
    }
    onSelectionChanged() {
        this.setState({
            currentSelection: wjcCore.format("({row},{col})-({row2},{col2})", this.flexGrid.selection)
        });
    }
    onRefreshClick() {
        this.flexGrid.collectionView.refresh();
    }
    onSelectClick() {
        this.combo.text = "CellRange";
        this.flexGrid.selection = new wjGrid.CellRange(0, 0, 1, 1);
    }
    onListSelectClick() {
        this.combo.text = "ListBox";
        this.flexGrid.select(0, 0);
        [0, 2, 4].forEach((index) => {
            this.flexGrid.rows[index].isSelected = true;
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
