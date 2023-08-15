import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdministrationComponent } from './dashboard-administration.component';

const routes: Routes = [
  { path: '', component: DashboardAdministrationComponent },
  { path: 'ministere', data: {breadcrumb: 'ministere'}, loadChildren: () => import('./parametre/ministere/ministere.module').then(m => m.MinistereModule) },
  { path: 'structure', data: {breadcrumb: 'structure'}, loadChildren: () => import('./parametre/structure/structure.module').then(m => m.StructureModule) },
  { path: 'indicateur', data: {breadcrumb: 'indicateur'}, loadChildren: () => import('./parametre/indicateur/indicateur.module').then(m => m.IndicateurModule) },
  { path: 'activite', data: {breadcrumb: 'activite'}, loadChildren: () => import('./parametre/activite/activite.module').then(m => m.ActiviteModule) },
  { path: 'document', data: {breadcrumb: 'document'}, loadChildren: () => import('./parametre/document/document.module').then(m => m.DocumentModule) },
  { path: 'user', data: {breadcrumb: 'utilisateur'}, loadChildren: () => import('./parametre/user/user.module').then(m => m.UserModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
