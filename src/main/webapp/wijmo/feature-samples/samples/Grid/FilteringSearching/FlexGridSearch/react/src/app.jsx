import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { FlexGridFilter } from '@grapecity/wijmo.react.grid.filter';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';
import { CollectionView } from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.theGrid = React.createRef();
        this.theSearch = React.createRef();
        // create CollectionView, update item count when it changes
        let view = new CollectionView(getData(), {
            collectionChanged: (s) => {
                this.setState({ itemCount: s.totalItemCount });
            }
        });
        this.state = {
            data: view,
            itemCount: view.totalItemCount,
        };
    }
    // connect search box and grid
    componentDidMount() {
        let theGrid = this.theGrid.current.control;
        let theSearch = this.theSearch.current.control;
        theSearch.grid = theGrid;
    }
    render() {
        return <div className='container-fluid'>

            
            <FlexGridSearch ref={this.theSearch} placeholder='FlexGridSearch'/>

            
            <FlexGrid ref={this.theGrid} itemsSource={this.state.data}>
                <FlexGridFilter /> 
            </FlexGrid>
            <p>
                The total item count is now <b>{this.state.itemCount}</b>.
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
