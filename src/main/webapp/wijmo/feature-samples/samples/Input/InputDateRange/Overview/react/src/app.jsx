import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Globalize, DateTime } from '@grapecity/wijmo';
import { InputDateRange, InputNumber } from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeStart: new Date(),
            rangeEnd: DateTime.addDays(new Date(), 2),
            predefinedRanges: this._getPredefinedRanges(),
            closeOnSelection: true,
            monthCount: 2,
            weeksBefore: 0,
            weeksAfter: 0,
        };
        this.valueChanged = this.valueChanged.bind(this);
        this.rangeEndChanged = this.rangeEndChanged.bind(this);
        this.closeOnSelectionChanged = this.closeOnSelectionChanged.bind(this);
        this.monthCountChanged = this.monthCountChanged.bind(this);
        this.weeksBeforeChanged = this.weeksBeforeChanged.bind(this);
        this.weeksAfterChanged = this.weeksAfterChanged.bind(this);
    }
    //
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theInputDateRange">InputDateRange: </label>
                <InputDateRange id="theInputDateRange" alwaysShowCalendar={true} predefinedRanges={this.state.predefinedRanges} value={this.state.rangeStart} rangeEnd={this.state.rangeEnd} valueChanged={this.valueChanged} rangeEndChanged={this.rangeEndChanged} closeOnSelection={this.state.closeOnSelection} monthCount={this.state.monthCount} weeksBefore={this.state.weeksBefore} weeksAfter={this.state.weeksAfter} handleWheel={false}/>
            </div>
            <div className="params">
                <div>
                    <label htmlFor="closeOnSelection">closeOnSelection</label>
                    <input type="checkbox" id="closeOnSelection" checked={this.state.closeOnSelection} onChange={this.closeOnSelectionChanged}/>
                </div>
                <div>
                    <label>monthCount</label>
                    <InputNumber step={1} min={1} value={this.state.monthCount} valueChanged={this.monthCountChanged}/>
                </div>
                <div>
                    <label>weeksBefore</label>
                    <InputNumber step={1} min={0} value={this.state.weeksBefore} valueChanged={this.weeksBeforeChanged}/>
                </div>
                <div>
                    <label>weeksAfter</label>
                    <InputNumber step={1} min={0} value={this.state.weeksAfter} valueChanged={this.weeksAfterChanged}/>
                </div>
            </div>
            <div>
                The current date/time is:{' '}
                <b>
                    from {this.formatDate(this.state.rangeStart)}{' '}
                    to {this.formatDate(this.state.rangeEnd)}
                </b>.
            </div>
        </div>;
    }
    //
    // store new range
    valueChanged(s) {
        this.setState({ rangeStart: s.value });
    }
    rangeEndChanged(s) {
        this.setState({ rangeEnd: s.rangeEnd });
    }
    //
    // property change handlers
    closeOnSelectionChanged(e) {
        this.setState({ closeOnSelection: e.target.checked });
    }
    monthCountChanged(s) {
        this.setState({ monthCount: s.value });
    }
    weeksBeforeChanged(s) {
        this.setState({ weeksBefore: s.value });
    }
    weeksAfterChanged(s) {
        this.setState({ weeksAfter: s.value });
    }
    //
    // format helper
    formatDate(date) {
        return Globalize.format(date, 'd');
    }
    //
    // get predefined date ranges
    _getPredefinedRanges() {
        let dt = DateTime, now = new Date();
        return {
            // custom
            'Custom Range': null,
            // days
            //'Today': [now, now],
            //'Yesterday': [dt.addDays(now, -1), dt.addDays(now, -1)],
            //'Tomorrow': [dt.addDays(now, +1), dt.addDays(now, +1)],
            // weeks
            'This Week': [dt.weekFirst(now), dt.weekLast(now)],
            'Last Week': [dt.weekFirst(dt.addDays(now, -7)), dt.weekLast(dt.addDays(now, -7))],
            'Next Week': [dt.weekFirst(dt.addDays(now, +7)), dt.weekLast(dt.addDays(now, +7))],
            // months
            'This Month': [dt.monthFirst(now), dt.monthLast(now)],
            'Last Month': [dt.monthFirst(dt.addMonths(now, -1)), dt.monthLast(dt.addMonths(now, -1))],
            'Next Month': [dt.monthFirst(dt.addMonths(now, +1)), dt.monthLast(dt.addMonths(now, +1))],
            // years
            'This Year': [dt.yearFirst(now), dt.yearLast(now)],
            'Last Year': [dt.addYears(dt.yearFirst(now), -1), dt.addYears(dt.yearLast(now), -1)],
            'Next Year': [dt.addYears(dt.yearFirst(now), +1), dt.addYears(dt.yearLast(now), +1)],
        };
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
