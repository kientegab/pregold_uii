import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IStructure, Structure } from 'src/app/shared/model/structure';

@Component({
  selector: 'app-detail-structure',
  templateUrl: './detail-structure.component.html',
  styleUrls: ['./detail-structure.component.scss']
})
export class DetailStructureComponent {
  structure: IStructure = new Structure();
  @Input() data: IStructure = new Structure();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.structure = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}
