import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { AggregatedViewRoutingModule } from './aggregated-view-routing.module';
import { AggregatedViewComponent } from './aggregated-view.component';

@NgModule({
  declarations: [
    AggregatedViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WjInputModule,
    CustomComponentsModule,
    AggregatedViewRoutingModule,
  ]
})
export class AggregatedGridModule {
}
