import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IDocument, Document } from 'src/app/shared/model/document';
import { DocumentService } from 'src/app/shared/service/document.service';
import { environment } from 'src/environments/environment';
import { CreerModifierDocumentComponent } from './creer-modifier-document/creer-modifier-document.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  routeData: Subscription | undefined;
  documentListSubscription: Subscription | undefined;
  documents: IDocument[] = [];
  document: IDocument = new Document();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  enableBtnDownload=true;
  enableCreate = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  regionDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  //itemsPerPage = ITEMS_PER_PAGE2;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string | undefined;
  //debutdocument: string = "";
  //findocument: string = "";




  constructor(
    private documentService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      () => {
        this.loadAll();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeData) {
      this.routeData.unsubscribe();
      if (this.documentListSubscription) {
        this.documentListSubscription.unsubscribe();
      }
    }
  }

  fireInfo() {}

  filtrer(): void {
    this.loadAll();
  }

  resetFilter(): void {
    this.filtreLibelle = undefined;
    this.filtrer();
  }

  loadPage(event: any): void {
    if (event) {
      this.page = event.first / event.rows + 1;
      this.recordsPerPage = event.rows;
    }
    this.transition();
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    });
    this.loadAll();
  }

  loadAll(): void {
    const req = this.buildReq();
    this.documentService.query(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.documents = result.body || [];
      }

    });
  }
  


  sortMethod(): string[] {
    this.predicate = 'id';
    this.reverse = true;
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

  buildReq(): any {
    let req = {
      page: this.page - 1,
      size: this.recordsPerPage,
      sort: this.sortMethod(),
    };
    let obj: any;
    if (this.filtreLibelle) {
      obj = {};
      obj['libelle.contains'] = this.filtreLibelle;
      req = Object.assign({}, req, obj);
    }
    return req;
  }


  /** Permet d'afficher un modal pour l'ajout */
  openModalCreate(): void {
    this.dialogService.open(CreerModifierDocumentComponent,
      {
        header: 'Ajouter une document',
        width: '60%',
        contentStyle: { overflow: 'auto', },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
      }
    ).onClose.subscribe(result => {
      if (result) {
        this.documents.push(result.body);
        this.isDialogOpInProgress = false;
        this.showMessage({ severity: 'success', summary: 'document creer avec succès' });
      }
    });
  }

  /** Permet d'afficher un modal pour la modification */
  openModalEdit(document: IDocument): void {
    this.dialogService.open(CreerModifierDocumentComponent,
      {
        header: 'Modifier un document',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
        data: document
      }).onClose.subscribe(result => {
        if (result) {
          this.isDialogOpInProgress = false;
          this.loadAll();
          this.showMessage({ severity: 'success', summary: 'document modifié avec succès' });
        }

      });

  }

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(document: IDocument): void {
    this.dialogService.open(DetailDocumentComponent,
      {
        header: 'Details de document',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: document
      });
  }


  // Suppression
  onDelete(document: IDocument) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce document?',
      accept: () => {
        this.delete(document);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.documentService.delete(selection.iddocument).subscribe(() => {
      this.documents = this.documents.filter(document => document.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'document supprimé avec succès',
      });
    }, (error) => {
      console.error("commune " + JSON.stringify(error));
      this.isOpInProgress = false;
      this.showMessage({ severity: 'error', summary: error.error.message });
    });
  }
  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }
  // Messages

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
  downloadLink: string = '';

  prepareDownloadLink(document: IDocument) {
    if (document.id !== undefined) {
      this.downloadLink = this.documentService.getDownloadLink(document.id);
    }
  }

  fireDownload(){
    
  }
}
