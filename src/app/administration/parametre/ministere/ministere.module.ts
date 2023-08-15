import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinistereRoutingModule } from './ministere-routing.module';
import { MinistereComponent } from './ministere.component';
import { CreerModifierMinistereComponent } from './creer-modifier-ministere/creer-modifier-ministere.component';
import { DetailMinistereComponent } from './detail-ministere/detail-ministere.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
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
import { ActionsToolbarIudModule } from 'src/app/shared/comon/actions-toolbar-iud/actions-toolbar-iud.module';


@NgModule({
  declarations: [
    MinistereComponent,
    CreerModifierMinistereComponent,
    DetailMinistereComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
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
    MinistereRoutingModule,
    ActionsToolbarIudModule
  ],
  providers: [ConfirmationService,MessageService],
})
export class MinistereModule { }
