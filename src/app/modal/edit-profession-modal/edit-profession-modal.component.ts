import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfessionService } from '../../admin/service/profession/profession.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-profession-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profession-modal.component.html',
  styleUrl: './edit-profession-modal.component.scss'
})
export class EditProfessionModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  public editProfessionForm: FormGroup

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private ps: ProfessionService) {
      this.editProfessionForm = this.fb.group({
        name: ['']
      })
    }

  onCancel() {
    this.cancel.emit()
  }

  onSubmit() {
    if(this.editProfessionForm.invalid) {
      return
    }

    this.ps.editEmergency
    this.submit.emit()
  }
}