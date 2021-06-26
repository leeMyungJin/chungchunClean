import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { CollectionView } from "@grapecity/wijmo";
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { FlexGridFilter } from "@grapecity/wijmo.react.grid.filter";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new CollectionView(getData(), {
                refreshOnEdit: false // on-demand sorting and filtering
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid showAlternatingRows={false} itemsSource={this.state.data}>
                <FlexGridFilter />
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
