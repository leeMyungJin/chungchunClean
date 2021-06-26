import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnalyticsModule } from '@grapecity/wijmo.angular2.chart.analytics';
//
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    safetyMargin = true;
    salesRevenue = true;
    totalCost = true;
    fixedCost = true;
    variableCost = true;
    marginalProfit = true;
    breakEven = true;
    appliedStyles = this.createStyles();
    //
    onClick(event: any) {
        const target = event.target;
        const key = target.id;
        const checked = target.checked;
        this[key] = checked;
        let styles = this.createStyles();
        for(let k in styles) {
            if(k==key){
                styles[k] = checked ? styles[k] : null;
            } else {
                styles[k] = this.appliedStyles[k];
            }
        }
        this.appliedStyles = styles;
    }
    //
    createStyles() {
        return {
            safetyMargin: { fill: "lightgreen", strokeWidth: 0 },
            salesRevenue: { stroke: "rgba(127,42,250,1)", strokeWidth: 3 },
            fixedCost: { stroke: "grey", strokeWidth: 3 },
            totalCost: { stroke: "red", strokeWidth: 3 },
            variableCost: { stroke: "black", strokeWidth: 3 },
            marginalProfit: { stroke: "green", strokeWidth: 3 },
            breakEven: { stroke: "rgba(69,171,235,1)", strokeWidth: 3 }
        };
    }
}
//
@NgModule({
    imports: [BrowserModule, WjChartModule, WjChartAnalyticsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

