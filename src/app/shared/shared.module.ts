import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ActionsToolbarIudComponent } from './comon/actions-toolbar-iud/actions-toolbar-iud.component';


@NgModule({
  declarations: [
    // ActionsToolbarIudComponent
  ],
  
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    // ActionsToolbarIudComponent
  ],
})
export class SharedModule { }
