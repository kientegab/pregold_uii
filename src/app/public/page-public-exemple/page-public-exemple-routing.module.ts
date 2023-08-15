import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagePublicExempleComponent } from './page-public-exemple.component';

const routes: Routes = [
  { path: '', component: PagePublicExempleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePublicExempleRoutingModule { }
