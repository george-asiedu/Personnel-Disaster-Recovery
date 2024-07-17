import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profession-modal',
  standalone: true,
  imports: [],
  templateUrl: './edit-profession-modal.component.html',
  styleUrl: './edit-profession-modal.component.scss'
})
export class EditProfessionModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()

  onCancel() {
    this.cancel.emit()
  }

  onSubmit() {
    this.submit.emit()
  }
}