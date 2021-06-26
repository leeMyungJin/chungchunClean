import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                This ComboBox uses a <b>wjItemTemplate</b> <i>render prop</i> to customize 
                the display of the items in the drop-down list.
            </p>
            <wjInput.ComboBox displayMemberPath="name" headerPath="name" itemsSource={this.state.data} wjItemTemplate={(context) => (<div className="item">
                        <h1>{context.item.name}</h1>
                        <b>{context.item.city}</b> ({context.item.state})<br />
                        {context.item.address}<br />
                        Phone: <b>{context.item.phone}</b><br />
                        Fax: <b>{context.item.fax}</b><br />
                        Website: <a href="{context.item.site}" target="_blank">{context.item.site}</a><br />
                    </div>)}>
            </wjInput.ComboBox>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
