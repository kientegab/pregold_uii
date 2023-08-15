import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { StructureComponent } from './structure.component';
import { CreerModifierStructureComponent } from './creer-modifier-structure/creer-modifier-structure.component';
import { DetailStructureComponent } from './detail-structure/detail-structure.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActionsToolbalIudComponent } from 'src/app/shared/common/actions-toolbal-iud/actions-toolbal-iud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsToolbarIudModule } from 'src/app/shared/comon/actions-toolbar-iud/actions-toolbar-iud.module';
// import { ActionsToolbarIudComponent } from 'src/app/shared/comon/actions-toolbar-iud/actions-toolbar-iud.component';



@NgModule({
  declarations: [
    StructureComponent,
    CreerModifierStructureComponent,
    DetailStructureComponent,
    // ActionsToolbarIudComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // SharedModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
    CardModule,
    InputTextModule,
    DialogModule,
    DividerModule,
    ProgressBarModule,
    MessageModule,
    DropdownModule,
    AppCommonModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    PaginatorModule,
    StructureRoutingModule,
    ActionsToolbarIudModule
  ],
  providers: [ConfirmationService,MessageService],
})
export class StructureModule { }
