import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ProfessionService } from '../../admin/service/profession/profession.service';
import { nameValidator } from '../../validators/nameValidator';
import { EmergencyService } from '../../admin/service/emergency/emergency.service';
import { EmergencyType } from '../../model/emergency-types';

@Component({
  selector: 'app-create-profession-modal',
  standalone: true,
  imports: [
    SpinnerComponent, 
    NgIf, 
    ReactiveFormsModule, 
    NgFor
  ],
  templateUrl: './create-profession-modal.component.html',
  styleUrl: './create-profession-modal.component.scss'
})
export class CreateProfessionModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  public addProfessionForm: FormGroup
  public loading: boolean = false

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private ps: ProfessionService) {
    this.addProfessionForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]]
    })
  }

  onSubmit() {
    if(this.addProfessionForm.invalid) {
      return
    }

    this.loading = true
    const name: string = this.addProfessionForm.value

    this.ps.addProfession(name).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, "Success", 3000)
        this.addProfessionForm.reset()
        this.submit.emit()
      },
      error: (err) => {
        console.error('error', err)
        this.loading = false
        this.toast.danger((err?.error?.message || 'Error adding profession'), "Error", 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }
}