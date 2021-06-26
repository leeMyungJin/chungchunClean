import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid autoGenerateColumns={false} allowResizing="None" initialized={s => s.autoSizeColumns()} loadedRows={s => s.autoSizeColumns()} rowEditEnded={s => s.autoSizeColumns()} cellEditEnded={(s, e) => s.autoSizeColumn(e.col)} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="ID" minWidth={60} isReadOnly={true}/>
                <FlexGridColumn binding="countries" header="Countries"/>
                <FlexGridColumn binding="sales" header="Sales" minWidth={80}/>
                <FlexGridColumn binding="expenses" header="Expenses" minWidth={80}/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
