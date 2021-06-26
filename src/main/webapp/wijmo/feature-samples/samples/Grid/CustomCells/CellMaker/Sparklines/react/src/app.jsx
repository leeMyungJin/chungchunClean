import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { CellMaker, SparklineType, SparklineMarkers } from "@grapecity/wijmo.grid.cellmaker";
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

                <FlexGridColumn binding="history" header="Sparklines: Line" width={175} cellTemplate={CellMaker.makeSparkline({
            //maxPoints: 5,
            markers: SparklineMarkers.High | SparklineMarkers.Low,
            label: '${item.country} sales history line chart',
        })}/>

                <FlexGridColumn binding="history" header="Sparklines: Column" width={175} cellTemplate={CellMaker.makeSparkline({
            //maxPoints: 5,
            type: SparklineType.Column,
            markers: SparklineMarkers.High | SparklineMarkers.Low,
            label: '${item.country} sales history column chart'
        })}/>

                <FlexGridColumn binding="history" header="Sparklines: WinLoss" width={175} cellTemplate={CellMaker.makeSparkline({
            //maxPoints: 5,
            type: SparklineType.WinLoss,
            markers: SparklineMarkers.Negative,
            label: '${item.country} sales history win/loss chart'
        })}/>
            </FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
