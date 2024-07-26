import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { nameValidator } from '../../validators/nameValidator';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { Manager } from '../../model/manager';
import { NgToastService } from 'ng-angular-popup';
import { ManagerService } from '../../admin/service/manager/manager.service';

@Component({
  selector: 'app-manager-modal',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './manager-modal.component.html',
  styleUrl: './manager-modal.component.scss'
})
export class ManagerModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  public loading: boolean = false
  public managerForm: FormGroup
  public selectedImageFile: File | null = null

  constructor(
    private toast: NgToastService,
    private manager: ManagerService,
    private fb: FormBuilder) {
    this.managerForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      image: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]]
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]
    if (file) {
      this.selectedImageFile = file
    }
  }

  onSubmit(): void {
    if(this.managerForm.invalid || !this.selectedImageFile) {
      return
    }

    this.loading = true
    const manager: Manager = this.managerForm.value

    this.manager.addManager(manager, this.selectedImageFile).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success('Manager added successfully', response.message, 3000)
        this.managerForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        console.error('Error adding file', err)
        this.toast.danger('Error adding manager', 'Error', 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }
}