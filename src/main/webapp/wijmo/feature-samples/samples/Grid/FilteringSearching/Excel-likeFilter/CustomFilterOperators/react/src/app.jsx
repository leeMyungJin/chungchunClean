import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from "@grapecity/wijmo";
import * as wjFilter from "@grapecity/wijmo.react.grid.filter";
import * as wjcGridFilter from "@grapecity/wijmo.grid.filter";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
        this.customizeFilterConditions();
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjFilter.FlexGridFilter defaultFilterType="Condition">
				</wjFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
    initialized(filter) {
        this.filter = filter;
        this.filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
    }
    customizeFilterConditions() {
        // customize the FlexGridFilter conditions
        let filter = wjcCore.culture.FlexGridFilter, Operator = wjcGridFilter.Operator;
        filter.stringOperators = [
            { name: "(doesn't matter)", op: null },
            { name: "Is", op: Operator.EQ },
            { name: "Is not", op: Operator.NE },
            { name: "Is bigger than", op: Operator.GT },
            { name: "Is smaller than", op: Operator.LT } // added
        ];
        filter.numberOperators = [
            { name: "(doesn't matter)", op: null },
            { name: "Is", op: Operator.EQ },
            { name: "Is not", op: Operator.NE },
            { name: "Is bigger than", op: Operator.GT },
            { name: "Is smaller than", op: Operator.LT }
        ];
        filter.dateOperators = [
            { name: "(doesn't matter)", op: null },
            { name: "Is", op: Operator.EQ },
            { name: "Is earlier than", op: Operator.LT },
            { name: "Is later than", op: Operator.GT }
        ];
        filter.booleanOperators = [
            { name: "(not set)", op: null },
            { name: "Is", op: Operator.EQ },
            { name: "Is not", op: Operator.NE }
        ];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
