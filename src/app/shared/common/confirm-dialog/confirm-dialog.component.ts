import { Component, EventEmitter, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Output() onConfirm: EventEmitter<void>
  @Output() onCancel: EventEmitter<void>

  constructor(public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig) {
    this.onConfirm = this.config.data.onConfirm || new EventEmitter<void>()
    this.onCancel = this.config.data.onCancel || new EventEmitter<void>()
  }

  confirm() {
    this.onConfirm.emit()
  }

  cancel() {
    this.dialogRef.close()
    this.onCancel.emit()
  }
}
