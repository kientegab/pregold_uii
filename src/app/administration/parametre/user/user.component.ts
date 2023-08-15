import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { environment } from 'src/environments/environment';
import { CreerModifierUserComponent } from './creer-modifier-user/creer-modifier-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { IUser, User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  routeData: Subscription | undefined;
  userListSubscription: Subscription | undefined;
  users: IUser[] = [];
  user: IUser = new User();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
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
  //debutuser: string = "";
  //finuser: string = "";




  constructor(
    private userService: UserService,
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
      if (this.userListSubscription) {
        this.userListSubscription.unsubscribe();
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
    this.userService.query(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.users = result.body || [];
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
    this.dialogService.open(CreerModifierUserComponent,
      {
        header: 'Ajouter une user',
        width: '60%',
        contentStyle: { overflow: 'auto', },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
      }
    ).onClose.subscribe(result => {
      if (result) {
        this.users.push(result.body);
        this.isDialogOpInProgress = false;
        this.showMessage({ severity: 'success', summary: 'user creer avec succès' });
      }
    });
  }

  /** Permet d'afficher un modal pour la modification */
  openModalEdit(user: IUser): void {
    this.dialogService.open(CreerModifierUserComponent,
      {
        header: 'Modifier un user',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true, 
        closable: true,
        data: user
      }).onClose.subscribe(result => {
        if (result) {
          this.isDialogOpInProgress = false;
          this.loadAll();
          this.showMessage({ severity: 'success', summary: 'user modifié avec succès' });
        }

      });

  }

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(user: IUser): void {
    this.dialogService.open(DetailUserComponent,
      {
        header: 'Details de user',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: user
      });
  }


  // Suppression
  onDelete(user: IUser) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce user?',
      accept: () => {
        this.delete(user);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.userService.delete(selection.idUser).subscribe(() => {
      this.users = this.users.filter(user => user.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'user supprimé avec succès',
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
}
