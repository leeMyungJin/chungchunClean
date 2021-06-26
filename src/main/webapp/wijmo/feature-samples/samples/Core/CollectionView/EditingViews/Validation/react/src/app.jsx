import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData, countries } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._theItem = {};
        //
        this._validateForm = (input) => {
            let propName = input.id, value = input.value;
            this._theItem[propName] = value;
            input.setCustomValidity(this._view.getError(this._theItem, propName));
        };
        this._view = new wijmo.CollectionView(getData(), {
            sortDescriptions: ['country'],
            getError: this._getError.bind(this),
        });
    }
    //
    render() {
        return <div className="container-fluid">
            <h2>FlexGrid Validation</h2>
            <p>
                When you use the <b>CollectionView.getError</b> method for validation,
                the <b>FlexGrid</b> will show errors in data cells and also in the
                row header cells.
            </p>
            <p>
                By default, the row header cells will show all the errors in the item.
                To customize that behavior, return the error message you want to show
                for the row header when <b>getError</b> is called without a specific
                property (prop == null).
            </p>
            <p>
                Try entering an invalid country or a negative number to see how the grid
                identifies the error and prevents the invalid entry from being committed:
            </p>
            <wjGrid.FlexGrid itemsSource={this._view}>
            </wjGrid.FlexGrid>

            <h2>Forms Validation</h2>
            <p>
                You can use the the
                <b>CollectionView.getError</b> property to validate forms as well. Simply call the function
                    and apply the result to the appropriate input element using the
                <b>setCustomValidity</b> method that is part of
                    the HTML5 validation API:
            </p>
            <form id="theForm" className="form-inline" onInput={e => this._validateForm(e.target)} onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input id="country" type="text" className="form-control" required defaultValue="US"/>
                </div>

                <div className="form-group">
                    <label htmlFor="downloads">Downloads</label>
                    <input id="downloads" type="number" className="form-control" required defaultValue="123"/>
                </div>

                <div className="form-group">
                    <label htmlFor="sales">Sales</label>
                    <input id="sales" type="number" className="form-control" required defaultValue="123"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>;
    }
    //
    _getError(item, propName) {
        switch (propName) {
            case 'country':
                return countries.indexOf(item.country) < 0 ? 'Invalid Country' : '';
            case 'downloads':
            case 'sales':
            case 'expenses':
                return item[propName] < 0 ? 'Negative values not allowed!' : '';
            case 'active':
                return item.active && item.country.match(/^(US|Germany)$/)
                    ? 'Active items not allowed in the US or Germany!'
                    : '';
            case null:
                let errors = [];
                for (let key in item) {
                    let err = this._getError(item, key);
                    if (err)
                        errors.push(err);
                }
                return errors.length > 1
                    ? 'this item has ' + errors.length + ' errors'
                    : (errors.length == 1 ? errors[0] : null);
        }
        return null;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
