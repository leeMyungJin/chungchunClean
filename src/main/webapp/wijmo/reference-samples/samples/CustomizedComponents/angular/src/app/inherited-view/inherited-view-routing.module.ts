import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InheritedViewComponent } from './inherited-view.component';

// tslint:disable-next-line:variable-name
export const InheritedViewRoutingModule: ModuleWithProviders<any> = RouterModule.forChild([
  { path: '', component: InheritedViewComponent }
]);
