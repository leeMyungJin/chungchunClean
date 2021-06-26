import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GoogleSheet, OAuth2 } from '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
class App extends React.Component {
    constructor(props) {
        super(props);
        // create the GoogleSheet data source
        this._gs = new GoogleSheet(SHEET_ID_NW, API_KEY, {
            sheets: ['Products', 'Categories', 'Suppliers']
        });
        // expose products, current user
        this.state = {
            products: this._gs.getSheet('Products'),
            user: null
        };
    }
    componentDidMount() {
        // create the OAuth2 component
        const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
        const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
        const auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
            error: (s, e) => {
                console.log(JSON.stringify(e.error, null, 2));
            }
        });
        // button to log in/out
        let oAuthBtn = document.getElementById('auth-btn'), oAuthTip = new Tooltip({
            cssClass: 'auth-tip',
            position: PopupPosition.BelowRight,
            gap: 0
        });
        // click button to log user in or out
        oAuthBtn.addEventListener('click', () => {
            if (auth.user) {
                auth.signOut();
            }
            else {
                auth.signIn();
            }
        });
        // update button/sheet state when user changes
        auth.userChanged.addHandler((s) => {
            let user = s.user;
            oAuthBtn.textContent = user ? 'Sign Out' : 'Sign In';
            oAuthTip.setTooltip(oAuthBtn, user
                ? `<b>Signed in as</b><br/>
                    ${user.firstName}<br/>
                    <img src="${user.imageUrl}"/><br/>
                    <span class="e-mail">${user.eMail}</span>`
                : null);
            // update GoogleSheet access token
            this._gs.accessToken = user ? s.accessToken : null;
            // allow editing if we are authenticated
            this.setState({
                user: user
            });
            // update message
            document.getElementById('auth-msg').textContent = user
                ? 'You are signed in, so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        });
    }
    // assign data maps to grid columns
    loadedRows(s) {
        let categoryCol = s.getColumn('CategoryID');
        if (categoryCol && !categoryCol.dataMap) {
            categoryCol.header = 'Category';
            categoryCol.width = 200;
            categoryCol.dataMap = new DataMap(this._gs.getSheet('Categories'), 'CategoryID', 'CategoryName');
        }
        let supplierCol = s.getColumn('SupplierID');
        if (supplierCol && !supplierCol.dataMap) {
            supplierCol.header = 'Supplier';
            supplierCol.width = 200;
            supplierCol.dataMap = new DataMap(this._gs.getSheet('Suppliers'), 'SupplierID', 'CompanyName');
        }
    }
    render() {
        return <div className='container-fluid'>

            <div className="auth">
                <div id="auth-msg"></div>
                <button id="auth-btn" className="btn btn-primary">
                    Sign In
                </button>
            </div>
            <FlexGrid selectionMode="MultiRange" showMarquee={true} allowAddNew={true} allowDelete={true} isReadOnly={!this.state.user} itemsSource={this.state.products} loadedRows={s => this.loadedRows(s)}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
