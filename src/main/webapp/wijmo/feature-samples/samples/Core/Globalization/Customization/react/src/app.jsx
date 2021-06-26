import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjGridFilter from '@grapecity/wijmo.react.grid.filter';
import * as wijmo from "@grapecity/wijmo";
import * as gridFilter from '@grapecity/wijmo.grid.filter';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjGridFilter.FlexGridFilter></wjGridFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
    componentWillMount() {
        // customize grid filter conditions
        let filter = wijmo.culture.FlexGridFilter, Operator = gridFilter.Operator;
        //
        filter.stringOperators = [
            { name: "(not set)", op: null },
            { name: "Same", op: Operator.EQ },
            { name: "Different", op: Operator.NE },
            { name: "Bigger", op: Operator.GT },
            { name: "Smaller", op: Operator.LT }
        ];
        //
        filter.numberOperators = [
            { name: "(not set)", Operator: null },
            { name: "Same", op: Operator.EQ },
            { name: "Different", op: Operator.NE },
            { name: "Bigger", op: Operator.GT },
            { name: "Smaller", op: Operator.LT }
        ];
        //
        filter.dateOperators = [
            { name: "(not set)", op: null },
            { name: "Same", op: Operator.EQ },
            { name: "Earlier", op: Operator.LT },
            { name: "Later", op: Operator.GT }
        ];
        //
        filter.booleanOperators = [
            { name: "(not set)", op: null },
            { name: "Is", op: Operator.EQ },
            { name: "Isn't", op: Operator.NE }
        ];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
