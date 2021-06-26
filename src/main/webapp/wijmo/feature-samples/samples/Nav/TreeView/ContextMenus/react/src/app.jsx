import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjNav from '@grapecity/wijmo.react.nav';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            menuSource: ['Option 1', 'Option 2', '<span class="wj-separator"></span>', 'Option 3', 'Option 4']
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjNav.TreeView itemsSource={this.state.data} displayMemberPath="header" childItemsPath="items" initialized={this.onTreeViewInitialized.bind(this)}>
                </wjNav.TreeView>
                <wjInput.Menu itemClicked={this.menuItemClick.bind(this)} initialized={this.onMenuInitialized.bind(this)} style={{ display: "none" }}>
                    <wjInput.MenuItem value="option1">Option 1</wjInput.MenuItem>
                    <wjInput.MenuItem value="option2">Option 2</wjInput.MenuItem>
                    <wjInput.MenuSeparator></wjInput.MenuSeparator>
                    <wjInput.MenuItem value="option3">Option 3</wjInput.MenuItem>
                    <wjInput.MenuItem value="option4">Option 4</wjInput.MenuItem>
                </wjInput.Menu>
            </div>);
    }
    onTreeViewInitialized(sender) {
        sender.hostElement.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (this._menu) {
                this._menu.show(e);
            }
        });
    }
    onMenuInitialized(sender) {
        this._menu = sender;
    }
    menuItemClick() {
        alert('thanks for selecting ' + this._menu.selectedValue);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
