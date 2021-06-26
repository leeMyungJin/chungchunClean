import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo-core.css';
import './styles.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import { getCalculatedView } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: getCalculatedView()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid alternatingRowStep={0} showMarquee={true} selectionMode="MultiRange" autoGenerateColumns={false} itemsSource={this.state.view}>
                
                
                <FlexGridColumn binding="product" header="Product"/>
                <FlexGridColumn binding="brand" header="Brand"/>
                <FlexGridColumn binding="unitPrice" header="Unit Price" format="c"/>
                <FlexGridColumn binding="qty" header="Quantity" format="n0"/>
                <FlexGridColumn binding="discount" header="Discount" format="p0"/>

                
                <FlexGridColumn binding="fullName" header="Full Name" cssClass="calculated"/>
                <FlexGridColumn binding="allCaps" header="Uppercase" cssClass="calculated"/>
                <FlexGridColumn binding="totalPrice" header="Total Price" format="c" cssClass="calculated"/>
                <FlexGridColumn binding="tax" header="Tax Amount" format="c" cssClass="calculated"/>
                
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
