import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
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
            <FlexGrid imeEnabled={true} itemsSource={this.state.data}>
                <FlexGridColumn binding="id" header="#" width={50} isReadOnly={true}/>
                <FlexGridColumn binding="en" header="English" isRequired={true}/>
                <FlexGridColumn binding="ja" header="Japanese"/>
                <FlexGridColumn binding="pop" header="Pop (tho)" format="n0,"/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
