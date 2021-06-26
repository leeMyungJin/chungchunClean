import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { RadialGauge } from '@grapecity/wijmo.gauge';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // state
    startAngles = [-90, -45, 0, 45, 90];
    startAngle = -45;
    sweepAngles = [-360, -270, -180, -90, 90, 180, 270, 360];
    sweepAngle = 270;
    tickSpacings = [20, 50, 100, 200, 250];
    tickSpacing = 50;
    needleShapes = 'None,Triangle,Diamond,Hexagon,Rectangle,Arrow,WideArrow,Pointer,WidePointer,Outer'.split(',');
    needleShape = 'Pointer';
    needleLengths = 'Outer,Middle,Inner'.split(',');
    needleLength = 'Middle';

    // create custom needles with the createNeedleElement utility
    _customNeedles = new Map();
    createNeedleElement(points: any[], innerRadius?: number, outerRadius?: number): Element {
        let needle = this._customNeedles.get(points);
        if (!needle) {
            needle = RadialGauge.createNeedleElement(points, innerRadius, outerRadius);
            this._customNeedles.set(points, needle);
        }
        return needle;
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

