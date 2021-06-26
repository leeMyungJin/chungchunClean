import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";
import { CollectionView } from "@grapecity/wijmo";
import { getData, getCountries } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: getCountries(),
            data: new CollectionView(getData(1000), {
                getError: (item, prop) => {
                    if (prop == 'rating') {
                        if (item.rating < 0 || item.rating > 5) {
                            return 'Ratings should be between zero and five.';
                        }
                    }
                    return null; // no errors
                }
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid showMarquee={true} selectionMode="MultiRange" autoGenerateColumns={false} itemsSource={this.state.data}>
                
                <FlexGridColumn binding="id" header="ID" isReadOnly={true} width={80}/>
                <FlexGridColumn binding="country" header="Country" dataMap={this.state.countries}/>

                <FlexGridColumn binding="rating" header="Rating (no stars)"/>
                
                <FlexGridColumn binding="rating" header="Rating (editable)" width={220} align="center" cellTemplate={CellMaker.makeRating({
            range: [0, 5],
            label: 'Edit Product Rating'
        })}/>
                <FlexGridColumn binding="rating" header="Rating (read-only)" isReadOnly={true} width={220} align="center" cssClass="custom-rating" cellTemplate={CellMaker.makeRating({
            range: [0, 5],
            label: 'See Product Rating'
        })}/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
