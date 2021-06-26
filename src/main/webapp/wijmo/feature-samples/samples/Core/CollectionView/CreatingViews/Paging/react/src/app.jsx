import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.react.grid";
import * as odata from '@grapecity/wijmo.odata';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateViewPager = (target) => {
            let btn = wijmo.closest(target, 'button'), id = btn ? btn.id : '';
            switch (id) {
                case 'btnFirst':
                    this.state.view.moveToFirstPage();
                    break;
                case 'btnPrev':
                    this.state.view.moveToPreviousPage();
                    break;
                case 'btnNext':
                    this.state.view.moveToNextPage();
                    break;
                case 'btnLast':
                    this.state.view.moveToLastPage();
                    break;
            }
            this.setState({
                viewIndex: this.state.view.pageIndex + 1,
                viewCount: this.state.view.pageCount
            });
        };
        this.updateOdataViewPager = (target) => {
            let btn = wijmo.closest(target, 'button'), id = btn ? btn.id : '';
            switch (id) {
                case 'btnFirstOd':
                    this.state.odataView.moveToFirstPage();
                    break;
                case 'btnPrevOd':
                    this.state.odataView.moveToPreviousPage();
                    break;
                case 'btnNextOd':
                    this.state.odataView.moveToNextPage();
                    break;
                case 'btnLastOd':
                    this.state.odataView.moveToLastPage();
                    break;
            }
            this.setState({
                odIndex: this.state.odataView.pageIndex + 1,
                odCount: this.state.odataView.pageCount
            });
        };
        let view = new wijmo.CollectionView(getData(), { pageSize: 6 }), odataView = new odata.ODataCollectionView('https://services.odata.org/Northwind/Northwind.svc', 'Customers', {
            pageSize: 6,
            pageOnServer: true,
            sortOnServer: true
        });
        this.state = {
            view: view,
            // use ODataCollectionView to demonstrate server-based paging
            odataView: odataView,
            viewIndex: view.pageIndex + 1,
            viewCount: view.pageCount,
            odIndex: odataView.pageIndex + 1,
            odCount: odataView.pageCount
        };
        odataView.loaded.addHandler((e) => {
            this.setState({
                odCount: odataView.pageCount
            });
        });
    }
    render() {
        return <div className="container-fluid">
            <h4>
                Client-Side Paging:
            </h4>
            <wjGrid.FlexGrid itemsSource={this.state.view} alternatingRowStep={0} headersVisibility="Column"></wjGrid.FlexGrid>
            <div onClick={e => this.updateViewPager(e.target)}>
                <button id="btnFirst" className="btn"><span className="wj-glyph-step-backward"></span></button>
                <button id="btnPrev" className="btn"><span className="wj-glyph-left"></span></button>
                &nbsp;&nbsp;&nbsp;Page {this.state.viewIndex} of {this.state.viewCount}&nbsp;&nbsp;&nbsp;
                <button id="btnNext" className="btn"><span className="wj-glyph-right"></span></button>
                <button id="btnLast" className="btn"><span className="wj-glyph-step-forward"></span></button>
            </div>
            <br />
            <h4>
                Server-Side Paging:
            </h4>
            <wjGrid.FlexGrid itemsSource={this.state.odataView} alternatingRowStep={0} headersVisibility="Column" isReadOnly={true}></wjGrid.FlexGrid>
            <div onClick={e => this.updateOdataViewPager(e.target)}>
                <button id="btnFirstOd" className="btn"><span className="wj-glyph-step-backward"></span></button>
                <button id="btnPrevOd" className="btn"><span className="wj-glyph-left"></span></button>
                &nbsp;&nbsp;&nbsp;Page {this.state.odIndex} of {this.state.odCount}&nbsp;&nbsp;&nbsp;
                <button id="btnNextOd" className="btn"><span className="wj-glyph-right"></span></button>
                <button id="btnLastOd" className="btn"><span className="wj-glyph-step-forward"></span></button>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
