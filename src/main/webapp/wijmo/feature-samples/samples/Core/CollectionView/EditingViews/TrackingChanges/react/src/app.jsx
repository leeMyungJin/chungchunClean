import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CollectionView } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: new CollectionView(getData(), {
                sortDescriptions: ["country"],
                trackChanges: true
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-6">
                    <FlexGrid itemsSource={this.state.view} allowAddNew={true} allowDelete={true}>
                    </FlexGrid>
                </div>
                <div className="col-xs-6">
                    <h4>Edited Items:</h4>
                    <FlexGrid className="changed edited" itemsSource={this.state.view.itemsEdited} isReadOnly={true}>
                    </FlexGrid>

                    <h4>Added Items:</h4>
                    <FlexGrid className="changed added" itemsSource={this.state.view.itemsAdded} isReadOnly={true}>
                    </FlexGrid>

                    <h4>Removed Items:</h4>
                    <FlexGrid className="changed removed" itemsSource={this.state.view.itemsRemoved} isReadOnly={true}>
                    </FlexGrid>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
