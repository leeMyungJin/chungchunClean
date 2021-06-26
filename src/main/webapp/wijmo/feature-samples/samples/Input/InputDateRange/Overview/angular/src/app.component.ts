import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { WjInputModule, WjInputDateRange } from '@grapecity/wijmo.angular2.input';
import { DateTime } from '@grapecity/wijmo';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    rangeStart = new Date();
    rangeEnd = DateTime.addDays(new Date(), 2);
    predefinedRanges = this._getPredefinedRanges();
    closeOnSelection = true;
    monthCount = 2;
    weeksBefore = 0;
    weeksAfter = 0;
    //
    // get predefined date ranges
    _getPredefinedRanges() {
        let dt = DateTime,
            now = new Date();
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
        } as any;
    }
}

@NgModule({
    imports: [WjInputModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

