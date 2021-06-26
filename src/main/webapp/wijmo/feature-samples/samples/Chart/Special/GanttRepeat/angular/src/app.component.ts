import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService, TTask } from './app.data';
import { HitTestInfo } from '@grapecity/wijmo.chart';
import { format } from '@grapecity/wijmo';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: TTask[];
    formatter = this.axisLabelFormatter.bind(this);

    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }

    // render task name instead of index on y axis
    axisLabelFormatter(engine: any, label: any) {
        var data = this.data;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.index == label.val) {
                label.text = item.name;
                break;
            }
        }
        return label;
    }

    // show task name and duraction in tooltip
    getTooltipContent(ht: HitTestInfo): string {
        var str = format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
            name: ht.item.name,
            start: ht.item.start,
            end: ht.item.end
        });
        return str;
    }
}

@NgModule({
    imports: [WjChartModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

