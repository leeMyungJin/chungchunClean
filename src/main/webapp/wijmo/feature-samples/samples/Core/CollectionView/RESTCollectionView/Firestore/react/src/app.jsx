import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RestCollectionViewFirestore } from './rest-collection-view-firestore';
import { CollectionViewNavigator } from '@grapecity/wijmo.react.input';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { OAuth2 } from '@grapecity/wijmo.cloud';
//
// Firestore info
const PROJECT_ID = 'test-9c0be';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
//
// field info for Customers table
const fields = 'CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax'.split(',');
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            isReadOnly: true,
            view: new RestCollectionViewFirestore(PROJECT_ID, API_KEY, 'Customers', {
                fields: fields,
                pageSize: 8,
                sortDescriptions: ['CustomerID'],
            }),
            auth: new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
                userChanged: (s) => {
                    let user = s.user;
                    let oAuthBtn = document.getElementById('auth-btn');
                    // update button text
                    oAuthBtn.textContent = user ? 'Sign Out' : 'Sign In';
                    // apply OAuth id token to the RestCollectionViewFirestore
                    this.state.view.idToken = s.idToken;
                    // make the grid read-only if the user is not signed in
                    this.setState({
                        isReadOnly: user == null,
                        msg: user
                            ? 'You are signed in as [<b>' + user.eMail + '</b>], so you may edit the grid (if you have permissions).'
                            : 'You are not signed in, so you cannot edit the grid.'
                    });
                }
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
            <button id="auth-btn" className="btn btn-primary" style={{ float: "right" }} onClick={e => {
            let auth = this.state.auth;
            if (auth.user) {
                auth.signOut();
            }
            else {
                auth.signIn();
            }
        }}>
                Sign In
            </button>

            <br />

            <CollectionViewNavigator cv={this.state.view} byPage={true} headerFormat="{current:n0}"/>
            <FlexGrid allowAddNew={true} allowDelete={true} showMarquee={true} selectionMode='MultiRange' deferResizing={true} alternatingRowStep={0} isReadOnly={this.state.isReadOnly} itemsSource={this.state.view} initialized={s => s.topLeftCells.columns[0].cellTemplate = ($) => $.text || ($.row.index + 1).toString()}>
                <FlexGridFilter />
            </FlexGrid>

            <p dangerouslySetInnerHTML={{ __html: this.state.msg }}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
