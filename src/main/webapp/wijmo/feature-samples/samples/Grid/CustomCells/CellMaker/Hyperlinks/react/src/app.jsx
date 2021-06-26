import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";
import { getData, getCountries } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: getCountries(),
            data: getData(1000)
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid showMarquee={true} selectionMode="MultiRange" autoGenerateColumns={false} itemsSource={this.state.data}>
                
                <FlexGridColumn binding="id" header="ID" isReadOnly={true} width={80}/>
                <FlexGridColumn binding="country" header="Country" dataMap={this.state.countries}/>

                <FlexGridColumn header="Simple Link" binding="country" cellTemplate={CellMaker.makeLink({
            click: (e, ctx) => alert('Clicked Link ** ' + ctx.item.country + ' **')
        })}/>
                <FlexGridColumn header="Real Link" binding="country" cellTemplate={CellMaker.makeLink({
            text: 'Visit <b>${item.country}</b>',
            href: '${item.url}',
            attributes: {
                target: '_blank',
                rel: 'noopener noreferrer',
                tabIndex: -1
            }
        })}/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
