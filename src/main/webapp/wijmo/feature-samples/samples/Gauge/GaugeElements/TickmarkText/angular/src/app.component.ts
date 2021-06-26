import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';

import { LinearGauge, GaugeDirection } from '@grapecity/wijmo.gauge';
import { ComboBox } from '@grapecity/wijmo.input';
import { toggleClass } from '@grapecity/wijmo';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // update linear gauge direction and style
    directionChanged(gauge: LinearGauge, cmbDirection: ComboBox) {
        gauge.direction = GaugeDirection[cmbDirection.text];
        toggleClass(gauge.hostElement, 'vertical', cmbDirection.text.match(/Up|Down/) != null);
    }
}

@NgModule({
    imports: [WjGaugeModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

