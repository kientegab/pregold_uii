import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IActivite, Activite } from 'src/app/shared/model/activite';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { DocumentService } from 'src/app/shared/service/document.service';
import { IndicateurService,  } from 'src/app/shared/service/indicateur.service';
import { StructureService } from 'src/app/shared/service/structure.service';

@Component({
  selector: 'app-creer-modifier-activite',
  templateUrl: './creer-modifier-activite.component.html',
  styleUrls: ['./creer-modifier-activite.component.scss']
})
export class CreerModifierActiviteComponent {
  @ViewChild('dtf') form!: NgForm;
  activite: IActivite = new Activite();
  @Input() data: IActivite = new Activite();
  activites: IActivite[]=[];
  indicateurs: IActivite[]=[];
  structures: IActivite[]=[];
  documents: IActivite[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private activiteService: ActiviteService,
    private indicateurService: IndicateurService,
    private structureService: StructureService,
    private documentService: DocumentService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadIndicateur();
    this.loadStructure();
    this.loadDocument();
    if (this.dynamicDialog.data) {
      this.activite = cloneDeep(this.dynamicDialog.data);
    }
    
  }

  loadIndicateur(event?: LazyLoadEvent) {
    this.indicateurService.findAll().subscribe(response => {
      this.indicateurs = response.body!;
      
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  loadStructure(event?: LazyLoadEvent) {
    this.structureService.findAll().subscribe(response => {
      this.structures = response.body!;
      
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  loadDocument(event?: LazyLoadEvent) {
    this.documentService.findAll().subscribe(response => {
      this.documents = response.body!;
      
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.activite.id;
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }
  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
  saveEntity(): void {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    if (this.activite) {
      console.log("activite to save -----------",this.activite);
      // Format the date to "yyyy-MM-dd" format
      //this.activite.date = this.activite.date.toISOString().slice(0, 10);
  
      if (this.activite.id) {
        this.activiteService.update(this.activite).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'activite modifié avec succès' });
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });
            }
          });
      } else {
        this.activiteService.create(this.activite).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'activite creer avec succès',
            });
          },
          error: (error) => {
            console.error("error" + JSON.stringify(error));
            this.isOpInProgress = false;
            this.showMessage({ severity: 'error', summary: error.error.message });
          }
        });
      }
    }
  }
  
}
