import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-emergency-modal',
  standalone: true,
  imports: [],
  templateUrl: './edit-emergency-modal.component.html',
  styleUrl: './edit-emergency-modal.component.scss'
})
export class EditEmergencyModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()

  onCancel() {
    this.cancel.emit()
  }

  onSubmit() {
    this.submit.emit()
  }
}
