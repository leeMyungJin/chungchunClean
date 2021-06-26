import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'inheritedView',
    loadChildren: () => import('./inherited-view/inherited-view.module').then(m => m.InheritedGridModule)
  },
  {
    path: 'aggregatedView',
    loadChildren: () => import('./aggregated-view/aggregated-view.module').then(m => m.AggregatedGridModule)
  },
  {
    path: '',
    redirectTo: 'inheritedView',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
