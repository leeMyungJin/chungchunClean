import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AggregatedViewComponent } from './aggregated-view.component';

// tslint:disable-next-line:variable-name
export const AggregatedViewRoutingModule: ModuleWithProviders<any> = RouterModule.forChild([
  { path: '', component: AggregatedViewComponent }
]);
