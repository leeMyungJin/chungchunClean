import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CollectionView } from '@grapecity/wijmo';
import { ComboBox, CollectionViewNavigator } from '@grapecity/wijmo.react.input';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: new CollectionView(this.getData(), {
                pageSize: 5
            })
        };
    }
    render() {
        return <div className="container-fluid">

            <label htmlFor="cmb-pg-size">Page Size</label>
            <ComboBox id="cmb-pg-size" itemsSource={[0, 5, 10]} selectedValue={this.state.view.pageSize} textChanged={s => this.state.view.pageSize = s.selectedValue}/>
            <br />

            <label htmlFor="cv-nav">Navigate By Item</label>
            <CollectionViewNavigator cv={this.state.view} headerFormat={'Item {currentItem:n0} of {itemCount:n0} (on page {currentPage:n0})'}/>
            <br />                

            <label htmlFor="cv-pg">Navigate By Page</label>
            <CollectionViewNavigator cv={this.state.view} byPage={true} headerFormat={'Page {current:n0} of {count:n0}'}/>
            <br />                
        
            <FlexGrid itemsSource={this.state.view} selectionMode={'RowRange'} showMarquee={true}/>
        </div>;
    }
    // get the data for the CollectionView
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), names = 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(','), data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i,
                name: names[i % names.length],
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.round(Math.random() * 20000),
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
