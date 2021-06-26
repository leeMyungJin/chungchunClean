import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { Control } from '@grapecity/wijmo';
import { ComboBox, MultiSelect } from '@grapecity/wijmo.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    countries = 'US,UK,Japan,Germany,France,Italy,Russia,China'.split(',');
    colors = 'Black,White,Grey,Red,Green,Blue'.split(',');

    // handle form submit and reset events
    submit(e: Event) {
        e.preventDefault();
        (e.target as HTMLFormElement).reset();
        alert('The form has been submitted.');
    }
    reset(e: Event) {
        let ctls = (e.target as HTMLFormElement).querySelectorAll('.wj-control');
        for (let i = 0; i < ctls.length; i++) {
            let ctl = Control.getControl(ctls[i]);
            if (ctl instanceof ComboBox && ctl.itemsSource) {
                ctl.selectedIndex = -1;
            }
            if (ctl instanceof MultiSelect) {
                ctl.checkedItems = [];
            }
        }
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

