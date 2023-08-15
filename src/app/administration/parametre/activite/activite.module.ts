import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiviteRoutingModule } from './activite-routing.module';
import { ActiviteComponent } from './activite.component';
import { CreerModifierActiviteComponent } from './creer-modifier-activite/creer-modifier-activite.component';
import { DetailActiviteComponent } from './detail-activite/detail-activite.component';
import { SharedModule } from 'src/app/shared/shared.module';
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
import { CalendarModule } from 'primeng/calendar';
import { ActionsToolbarIudModule } from 'src/app/shared/comon/actions-toolbar-iud/actions-toolbar-iud.module';


@NgModule({
  declarations: [
    ActiviteComponent,
    CreerModifierActiviteComponent,
    DetailActiviteComponent
  ],
  imports: [
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
    CalendarModule,
    ActiviteRoutingModule,
    ActionsToolbarIudModule
  ],
  providers: [ConfirmationService,MessageService],
})
export class ActiviteModule { }
