import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { PublicModule } from './public/public.module';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActionsToolbarIudComponent } from './shared/comon/actions-toolbar-iud/actions-toolbar-iud.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        // ActionsToolbarIudComponent
    ],
    imports: [
        AppRoutingModule,
        PublicModule,
        AppLayoutModule,
        RouterModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DialogService,
        ConfirmationService,
        MessageService,
        DynamicDialogConfig,
        DynamicDialogRef
    ],
    exports: [
        // ActionsToolbarIudComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
