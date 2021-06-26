import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import { getData, getAnotherData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            anotherData: getAnotherData(),
            allowDrag1: true,
            allowDrag2: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <label>
                    <input id="dragWithin" type="checkbox" checked={this.state.allowDrag1} onClick={this.setAllowDrag1.bind(this)}/>
                    allow dragging within trees
                    </label>
                <br />
                <label>
                    <input id="dragBetween" type="checkbox" checked={this.state.allowDrag2} onClick={this.setAllowDrag2.bind(this)}/>
                    allow dragging between trees
                </label>

                <div className="row">
                    <div className="col-xs-6">
                        <wjNav.TreeView className="short-tree" itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" allowDragging={true} dragOver={this.onDragOverBetweenTrees.bind(this)}></wjNav.TreeView>
                    </div>
                    <div className="col-xs-6">
                        <wjNav.TreeView className="short-tree" itemsSource={this.state.anotherData} displayMemberPath="header" childItemsPath="items" allowDragging={true} dragOver={this.onDragOverBetweenTrees.bind(this)}></wjNav.TreeView>
                    </div>
                </div>
            </div>);
    }
    onDragOverBetweenTrees(s, e) {
        var t1 = e.dragSource.treeView;
        var t2 = e.dropTarget.treeView;
        //
        // prevent dragging within trees
        if (t1 == t2 && !document.getElementById("dragWithin").checked) {
            e.cancel = true;
        }
        //
        // allow dragging between trees
        if (t1 != t2 && document.getElementById("dragBetween").checked) {
            e.cancel = false;
        }
    }
    setAllowDrag1() {
        this.setState({ allowDrag1: !this.state.allowDrag1 });
    }
    setAllowDrag2() {
        this.setState({ allowDrag2: !this.state.allowDrag2 });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
