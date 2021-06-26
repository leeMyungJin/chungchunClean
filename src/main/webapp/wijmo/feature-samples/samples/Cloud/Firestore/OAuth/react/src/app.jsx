import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Firestore, OAuth2 } from '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition, SortDescription } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
class App extends React.Component {
    constructor(props) {
        super(props);
        // create the Firestore data source
        const PROJECT_ID = 'test-9c0be';
        this._fs = new Firestore(PROJECT_ID, API_KEY, {
            collections: ['Products', 'Categories', 'Suppliers']
        });
        // expose products, current user
        let products = this._fs.getCollection('Products');
        products.sortDescriptions.push(new SortDescription('ProductID', true));
        let mapCat = new DataMap(this._fs.getCollection('Categories'), 'CategoryID', 'CategoryName');
        let mapSup = new DataMap(this._fs.getCollection('Suppliers'), 'SupplierID', 'CompanyName');
        this.state = {
            products: products,
            mapCat: mapCat,
            mapSup: mapSup,
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
            // update Firestore id token
            this._fs.idToken = user ? s.idToken : null; // Firestore authentication
            //this._fs.accessToken = user ? s.accessToken : null; // IAM authentication
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
    render() {
        return <div className='container-fluid'>

            <div className="auth">
                <div id="auth-msg"></div>
                <button id="auth-btn" className="btn btn-primary">
                    Sign In
                </button>
            </div>
            <FlexGrid selectionMode="MultiRange" showMarquee={true} allowAddNew={true} allowDelete={true} isReadOnly={!this.state.user} itemsSource={this.state.products} autoGenerateColumns={false}>
                <FlexGridColumn binding="ProductID" header="ID"/>
                <FlexGridColumn binding="ProductName" header="Product Name" width={200}/>
                <FlexGridColumn binding="CategoryID" header="Category" width={150} dataMap={this.state.mapCat}/>
                <FlexGridColumn binding="SupplierID" header="Supplier" width={150} dataMap={this.state.mapSup}/>
                <FlexGridColumn binding="UnitPrice" header="Unit Price" format="n2"/>
                <FlexGridColumn binding="QuantityPerUnit" header="Qty per Unit" width={150}/>
                <FlexGridColumn binding="UnitsInStock" header="Units in Stock"/>
                <FlexGridColumn binding="Discontinued"/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
