import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getHolidays } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initCalendar = (calendar) => {
            calendar.invalidate();
            this.setState({ theCalendar: calendar });
        };
        this.formatItem = (s, e) => {
            // apply styles to weekends and holidays
            let weekday = e.data.getDay(), holiday = this._getHoliday(e.data);
            wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
            wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
            e.item.title = holiday;
        };
        this._getHoliday = (date) => {
            let day = date.getDate(), month = date.getMonth() + 1, holiday = this.state.holidays[month + '/' + day];
            if (!holiday) {
                let weekDay = date.getDay(), weekNum = Math.floor((day - 1) / 7) + 1;
                holiday = this.state.holidays[month + '/' + weekNum + '/' + weekDay];
            }
            return holiday;
        };
        this.formatDate = (time) => {
            return wijmo.Globalize.format(time, 'D');
        };
        this.onValueChanged = (sender) => {
            this.setState({ theCalendar: sender });
        };
        this.state = {
            theCalendar: {},
            holidays: getHolidays()
        };
    }
    render() {
        return <div className="container">
            <wjInput.Calendar initialized={this.initCalendar} valueChanged={this.onValueChanged} formatItem={this.formatItem}>
            </wjInput.Calendar>
            <div>
                The current date is <b>{this.formatDate(this.state.theCalendar.value)}</b>.
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
