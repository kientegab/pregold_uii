import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsToolbarIudRoutingModule } from './actions-toolbar-iud-routing.module';
import { ActionsToolbarIudComponent } from './actions-toolbar-iud.component';


@NgModule({
  declarations: [ActionsToolbarIudComponent],
  imports: [
    CommonModule,
    ActionsToolbarIudRoutingModule
  ],
  exports:[ActionsToolbarIudComponent]
})
export class ActionsToolbarIudModule { }
