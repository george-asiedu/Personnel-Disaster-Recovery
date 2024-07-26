import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmergencyType } from '../../model/emergency-types';
import { EmergencyService } from '../../admin/service/emergency/emergency.service';
import { NgToastService } from 'ng-angular-popup';
import { nameValidator } from '../../validators/nameValidator';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-edit-emergency-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    SpinnerComponent,
    NgIf
  ],
  templateUrl: './edit-emergency-modal.component.html',
  styleUrl: './edit-emergency-modal.component.scss'
})
export class EditEmergencyModalComponent implements OnChanges {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  @Input() emergency: EmergencyType| null = null
  public loading: boolean = false
  public emergencyForm: FormGroup

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private es: EmergencyService) {
      this.emergencyForm = this.fb.group({
        name: ['', [Validators.required, nameValidator()]]
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emergency'] && this.emergency) {
      this.setProject(this.emergency)
    }
  }

  onCancel() {
    this.cancel.emit()
  }

  onSubmit() {
    if(this.emergencyForm.invalid) {
      return
    }

    this.loading = true
    const updatedName: string = this.emergencyForm.value

    this.es.editEmergency(this.emergency!.id, updatedName).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.emergencyForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err?.error?.message, 'Error', 3000)
      }
    })
  }

  private setProject(emergency: EmergencyType) {
    this.emergencyForm.setValue({
      name: emergency.name
    })
  }
}
