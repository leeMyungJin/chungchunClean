import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    chartTypeData: string[];
    chartType: string;
    stepPositionData: string[];
    stepPosition: string;
    //
    // references control in the view
    @ViewChild('theChart', { static: true }) theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.chartTypeData = dataService.getChartTypeData();
        this.chartType = 'Step';
        this.stepPositionData = dataService.getStepPositionData();
        this.stepPosition = 'Center';
    }
    //
    ngAfterViewInit() {
        this.theChart.options = {
            step: {
                position: 'center'
            }
        };
    }
    stepPositionChanged(combo: wjInput.ComboBox) {
        this.theChart.options.step.position = combo.text.toLowerCase();
        this.theChart.refresh();
    }
}
//
@NgModule({
    imports: [FormsModule, WjInputModule, WjChartModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);