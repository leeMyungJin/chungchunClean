import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WjCoreModule } from '@grapecity/wijmo.angular2.core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { InheritedViewRoutingModule } from './inherited-view-routing.module';
import { InheritedViewComponent } from './inherited-view.component';

@NgModule({
  declarations: [
    InheritedViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WjCoreModule,
    WjInputModule,
    WjGridModule,
    CustomComponentsModule,
    InheritedViewRoutingModule
  ]
})
export class InheritedGridModule {
}
