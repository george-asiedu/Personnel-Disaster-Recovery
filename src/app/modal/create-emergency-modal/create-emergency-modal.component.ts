import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { EmergencyService } from '../../admin/service/emergency/emergency.service';
import { nameValidator } from '../../validators/nameValidator';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-emergency-modal',
  standalone: true,
  imports: [SpinnerComponent, NgIf, ReactiveFormsModule],
  templateUrl: './create-emergency-modal.component.html',
  styleUrls: ['./create-emergency-modal.component.scss']
})
export class CreateEmergencyModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  public emergencyForm: FormGroup
  public loading: boolean = false

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private es: EmergencyService
  ) {
    this.emergencyForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]]
    })
  }

  onSubmit(): void {
    if (this.emergencyForm.invalid) {
      return
    }

    this.loading = true

    const name: string = this.emergencyForm.value

    this.es.createEmergency(name).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.emergencyForm.reset()
        this.submit.emit()
      },
      error: () => {
        this.loading = false
        this.toast.danger('Error adding emergency', 'Error', 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }
}