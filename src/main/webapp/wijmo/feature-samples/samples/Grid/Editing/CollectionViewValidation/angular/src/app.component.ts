import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { CollectionView, DateTime } from '@grapecity/wijmo';
import '@grapecity/wijmo.input';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = new CollectionView(this._getData(), {
        getError: (item: any, prop: string, parsing: boolean) => {

            // parsing errors
            if (parsing) {
                switch (prop) {
                    case 'country':
                        return 'Please select a country from the list.';
                    case 'date':
                        return 'Please enter a date in the format "M/d/yyyy".'
                    default:
                        return 'Please enter a number.';
                }
            }

            // data errors
            if (prop == 'sales' && item.sales < 0) {
                return 'Sales cannot be negative!';
            }
            if (prop == 'expenses' && item.expenses < 0) {
                return 'Expenses cannot be negative!';
            }

            // no errors
            return null;
        }
    });
    countries = this._getCountries();

    private _getCountries(): string[] {
        return 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    }
    private _getData(): any[] {
        let countries = this._getCountries(),
            today = new Date(),
            data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                date: DateTime.addDays(today, -Math.random() * 360),
                overdue: (i + 1) % 4 == 0
            });
        }
        return data;
    }
}

@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

