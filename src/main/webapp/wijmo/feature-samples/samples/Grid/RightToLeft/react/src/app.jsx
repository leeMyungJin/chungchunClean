import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { CollectionView } from "@grapecity/wijmo";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new CollectionView(getData())
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="col-md-6">
                <h2>
                    Left to Right
                </h2>
                <FlexGrid itemsSource={this.state.data}/>
            </div>
            <div className="col-md-6" dir="rtl">
                <h2>
                    Right to Left
                </h2>
                <FlexGrid itemsSource={this.state.data}/>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
