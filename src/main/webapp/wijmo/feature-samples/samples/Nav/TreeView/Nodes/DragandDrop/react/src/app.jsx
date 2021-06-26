import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import * as WjcNav from "@grapecity/wijmo.nav";
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            allowDragging: true,
            allowDraggingParentNodes: true,
            allowDroppingIntoEmpty: true,
        };
    }
    render() {
        return (<div className="container-fluid">
                <label>
                    <input id="allowDragging" type="checkbox" checked={this.state.allowDragging} onClick={this.onAllowDraggingClick.bind(this)}/>
                    allow dragging
                </label>
                <br />
                <label>
                    <input id="allowDraggingParentNodes" type="checkbox" checked={this.state.allowDraggingParentNodes} onClick={this.setAllowDraggingParentNodes.bind(this)}/>
                    allow dragging parent nodes
                    </label>
                <br />
                <label>
                    <input id="allowDroppingIntoEmpty" type="checkbox" checked={this.state.allowDroppingIntoEmpty} onClick={this.setAllowDroppingIntoEmpty.bind(this)}/>
                    allow dropping into empty nodes
                </label>

                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" imageMemberPath="img" showCheckboxes={true} allowDragging={this.state.allowDragging} dragStart={this.onDragStart.bind(this)} dragOver={this.onDragOver.bind(this)}></wjNav.TreeView>
            </div>);
    }
    onDragStart(s, e) {
        if (e && e.node && e.node.hasChildren) {
            if (!document.getElementById("allowDraggingParentNodes").checked) {
                e.cancel = true; // prevent dragging parent nodes
            }
            else {
                e.node.isCollapsed = true; // collapse parent nodes when dragging
            }
        }
    }
    onDragOver(s, e) {
        if (!document.getElementById("allowDroppingIntoEmpty").checked &&
            !e.dropTarget.hasChildren &&
            e.position == WjcNav.DropPosition.Into) {
            e.position = WjcNav.DropPosition.Before;
        }
    }
    onAllowDraggingClick(e) {
        this.setState({ allowDragging: !this.state.allowDragging });
    }
    setAllowDraggingParentNodes() {
        this.setState({ allowDraggingParentNodes: !this.state.allowDraggingParentNodes });
    }
    setAllowDroppingIntoEmpty() {
        this.setState({ allowDroppingIntoEmpty: !this.state.allowDroppingIntoEmpty });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
