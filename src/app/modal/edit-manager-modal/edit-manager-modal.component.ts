import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Manager, Managers } from '../../model/manager';
import { NgToastService } from 'ng-angular-popup';
import { ManagerService } from '../../admin/service/manager/manager.service';
import { nameValidator } from '../../validators/nameValidator';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { Profession } from '../../model/professions';

@Component({
  selector: 'app-edit-manager-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    SpinnerComponent
  ],
  templateUrl: './edit-manager-modal.component.html',
  styleUrl: './edit-manager-modal.component.scss'
})
export class EditManagerModalComponent implements OnChanges {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  @Input() manager: Managers | null = null
  public loading: boolean = false
  public managerForm: FormGroup

  constructor(
    private toast: NgToastService,
    private ms: ManagerService,
    private fb: FormBuilder) {
      this.managerForm = this.fb.group({
        name: ['', [Validators.required, nameValidator()]],
        phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
        email: ['', [Validators.required, Validators.email]]
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manager'] && this.manager) {
      this.setProject(this.manager)
    }
  }

  onCancel() {
    this.cancel.emit()
  }

  onSubmit() {
    if(this.managerForm.invalid) {
      return
    }

    this.loading = true
    const updatedManager: Manager = this.managerForm.value

    this.ms.updateManager(this.manager!.id, updatedManager).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.managerForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err?.error?.message, 'Error', 3000)
      }
    })
  }

  private setProject(manager: Managers) {
    this.managerForm.setValue({
      name: manager.name,
      phoneNumber: manager.phoneNumber,
      email: manager.email
    })
  }
}