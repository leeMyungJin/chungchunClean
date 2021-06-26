import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RestCollectionViewReqRes } from './rest-collection-view-reqres';
import { CollectionViewNavigator } from '@grapecity/wijmo.react.input';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paged: true,
            view: new RestCollectionViewReqRes('users', {
                key: 'id',
                pageSize: 8
            })
        };
    }
    render() {
        return <div className="container-fluid">

            <label>
                Paging{' '}
                <input id="paging" type="checkbox" checked={this.state.view.pageSize > 0} onChange={e => {
            this.state.view.pageSize = this.state.view.pageSize == 0 ? 8 : 0;
            this.forceUpdate();
        }}>
                </input>
            </label>

            <br />

            <CollectionViewNavigator cv={this.state.view} byPage={true}/>
            <FlexGrid allowAddNew={true} allowDelete={true} showMarquee={true} selectionMode='MultiRange' deferResizing={true} alternatingRowStep={0} itemsSource={this.state.view} initialized={s => s.topLeftCells.columns[0].cellTemplate = ($) => $.text || ($.row.index + 1).toString()}>
                <FlexGridFilter />
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
