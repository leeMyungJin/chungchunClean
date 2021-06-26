import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._updatePageText = () => {
            this.setState({
                pageText: wjCore.format('{index:n0} / {count:n0}', {
                    index: this.state.pagedOrders.pageIndex + 1,
                    count: this.state.pagedOrders.pageCount
                })
            });
        };
        this.onGotoPageClick = (command) => {
            if (command === 'first') {
                this.state.pagedOrders.moveToFirstPage();
            }
            else if (command === 'previous') {
                this.state.pagedOrders.moveToPreviousPage();
            }
            else if (command === 'next') {
                this.state.pagedOrders.moveToNextPage();
            }
            else if (command === 'last') {
                this.state.pagedOrders.moveToLastPage();
            }
        };
        this.state = {
            pagedOrders: getData().pagedOrders,
            layoutDefinition: getData().ldThreeLines,
            pageText: ''
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.pagedOrders} layoutDefinition={this.state.layoutDefinition}></wjGrid.MultiRow>
            <div className="btn-group">
                <button type="button" className="btn" onClick={e => this.onGotoPageClick('first')}>
                    <span className="glyphicon glyphicon-fast-backward"></span>
                </button>
                <button type="button" className="btn" onClick={e => this.onGotoPageClick('previous')}>
                    <span className="glyphicon glyphicon-step-backward"></span>
                </button>
                <button type="button" className="btn" disabled style={{ width: "100px" }} dangerouslySetInnerHTML={{ __html: this.state.pageText }}></button>
                <button type="button" className="btn" onClick={e => this.onGotoPageClick('next')}>
                    <span className="glyphicon glyphicon-step-forward"></span>
                </button>
                <button type="button" className="btn" onClick={e => this.onGotoPageClick('last')}>
                    <span className="glyphicon glyphicon-fast-forward"></span>
                </button>
            </div>
        </div>;
    }
    componentDidMount() {
        let pagedOrders = this.state.pagedOrders;
        this._updatePageText();
        pagedOrders.collectionChanged.addHandler(() => {
            this._updatePageText();
        });
        pagedOrders.pageChanged.addHandler(() => {
            this._updatePageText();
        });
        this.setState({ pagedOrders: pagedOrders });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
