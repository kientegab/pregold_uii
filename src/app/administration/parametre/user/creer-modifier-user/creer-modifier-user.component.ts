import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IUser, User } from 'src/app/shared/model/user';
//import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilService } from 'src/app/shared/service/profil.service';
import { StructureService } from 'src/app/shared/service/structure.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-creer-modifier-user',
  templateUrl: './creer-modifier-user.component.html',
  styleUrls: ['./creer-modifier-user.component.scss']
})
export class CreerModifierUserComponent {
  @ViewChild('dtf') form!: NgForm;
  user: IUser = new User();
  @Input() data: IUser = new User();
  users: IUser[]=[];
  profils: IUser[]=[];
  structures: IUser[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private structureService: StructureService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    //private dynamicDialogConfig: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfil();
    this.loadStructure();
    if (this.dynamicDialog.data) {
      this.user = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadProfil(event?: LazyLoadEvent) {
    this.profilService.findAll().subscribe(response => {
      this.profils = response.body!;
      
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
  clear(): void {
    this.form.resetForm();
    //this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.user.id;
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
  
    const userObservable = this.user.id
      ? this.userService.update(this.user)
      : this.userService.create(this.user);
  
    userObservable.subscribe(
      (response) => {
        this.dialogRef.close(response);
        this.dialogRef.destroy();
        const successMessage = this.user.id
          ? 'Utilisateur modifié avec succès'
          : 'Utilisateur créé avec succès';
        this.showMessage({ severity: 'success', summary: successMessage });
        this.router.navigate(['/']);
      },
      (error) => {
        console.error("error" + JSON.stringify(error));
        this.isOpInProgress = false;
        this.showMessage({ severity: 'error', summary: error.error.message });
      }
    );
  }
  
}
