import '../license';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashService } from './services/dash.service';
import { EsriMapComponent } from './components/esri-map.component';
import { EsriCrosshairComponent } from './components/esri-crosshair.component';
import { EsriLegendComponent } from './components/esri-legend.component';
import { GdashTileComponent } from './components/gdash-tile.component';
import { GdashSliderComponent } from './components/gdash-slider.component';
import { LongitudePipe } from './pipes/longitude.pipe';
import { LatitudePipe } from './pipes/latitude.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    EsriCrosshairComponent,
    EsriLegendComponent,
    GdashTileComponent,
    GdashSliderComponent,
    LatitudePipe,
    LongitudePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    WjChartAnimationModule,
    WjInputModule,
    WjChartModule,
    WjGaugeModule,
    WjNavModule
  ],
  providers: [DashService],
  bootstrap: [AppComponent]
})
export class AppModule { }
