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
  public managers: Manager[] = []
  public managerForm: FormGroup

  constructor(
    private toast: NgToastService,
    private manager: ManagerService,
    private fb: FormBuilder) {
    this.managerForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      institution: ['', [Validators.required, nameValidator()]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]]
    })
  }

  onSubmit(): void {
    if(this.managerForm.invalid) {
      return
    }

    this.loading = true
    const manager: Manager = this.managerForm.value

    this.manager.addManager(manager).subscribe({
      next: (response) => {
        this.loading = false
        this.managers = response.data.manager
        this.toast.success('Manager added successfully', response.message, 3000)
        this.managerForm.reset()
        this.submit.emit()
      }, error: () => {
        this.loading = false
        this.toast.danger('Error adding manager', 'Error', 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }
}