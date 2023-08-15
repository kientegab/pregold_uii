import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IIndicateur, Indicateur } from 'src/app/shared/model/indicateur';

@Component({
  selector: 'app-detail-indicateur',
  templateUrl: './detail-indicateur.component.html',
  styleUrls: ['./detail-indicateur.component.scss']
})
export class DetailIndicateurComponent {
  indicateur: IIndicateur = new Indicateur();
  @Input() data: IIndicateur = new Indicateur();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.indicateur = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}
