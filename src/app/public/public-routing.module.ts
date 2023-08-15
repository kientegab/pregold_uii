import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPublicComponent } from './dashboard-public.component';

const routes: Routes = [
  { path: '', component: DashboardPublicComponent },
  //{ path: 'service', data: {breadcrumb: 'service'}, loadChildren: () => import('./page-public-exemple/page-public-exemple.module').then(m => m.PagePublicExempleModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
