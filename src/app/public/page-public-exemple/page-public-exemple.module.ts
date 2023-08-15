import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagePublicExempleRoutingModule } from './page-public-exemple-routing.module';
import { PagePublicExempleComponent } from './page-public-exemple.component';


@NgModule({
  declarations: [
    PagePublicExempleComponent
  ],
  imports: [
    CommonModule,
    PagePublicExempleRoutingModule
  ]
})
export class PagePublicExempleModule { }
