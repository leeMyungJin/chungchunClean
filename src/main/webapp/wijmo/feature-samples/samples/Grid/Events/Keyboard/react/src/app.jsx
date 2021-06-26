import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjInput from "@grapecity/wijmo.react.input";
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
            <wjGrid.FlexGrid allowAddNew={true} initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>

            <wjInput.Popup className="modal-content" initialized={this.initPopup.bind(this)}>
                <div className="modal-header">Deleting Row</div>
                <div className="modal-body">Do you really want to delete this row?</div>
                <div className="modal-footer">
                    <button className="btn btn-primary wj-hide-ok">Yes</button>
                    <button className="btn btn-default wj-hide">No</button>
                </div>
            </wjInput.Popup>
        </div>;
    }
    initializeGrid(flex) {
        flex.hostElement.addEventListener("keydown", e => {
            let view = flex.collectionView;
            // looking for ctrl+Delete
            if (e.ctrlKey &&
                e.keyCode == wjcCore.Key.Delete &&
                view.currentItem) {
                // prevent the grid from getting the key
                e.preventDefault();
                // confirm row deletion
                this.popup.show(true, sender => {
                    // delete the row
                    if (sender.dialogResult == "wj-hide-ok") {
                        view.remove(view.currentItem);
                    }
                    // return focus to the grid
                    flex.focus();
                });
            }
        }, true);
    }
    initPopup(popup) {
        this.popup = popup;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
