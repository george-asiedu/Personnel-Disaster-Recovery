import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessionService } from '../../admin/service/profession/profession.service';
import { NgToastService } from 'ng-angular-popup';
import { Profession } from '../../model/professions';
import { nameValidator } from '../../validators/nameValidator';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profession-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpinnerComponent,
    NgIf
  ],
  templateUrl: './edit-profession-modal.component.html',
  styleUrl: './edit-profession-modal.component.scss'
})
export class EditProfessionModalComponent implements OnChanges {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  @Input() profession: Profession | null = null
  public loading: boolean = false
  public editProfessionForm: FormGroup

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private ps: ProfessionService) {
      this.editProfessionForm = this.fb.group({
        name: ['', [Validators.required, nameValidator()]]
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profession'] && this.profession) {
      this.setProject(this.profession)
    }
  }

  onCancel() {
    this.cancel.emit()
  }

  onSubmit() {
    if(this.editProfessionForm.invalid) {
      return
    }

    this.loading = true
    const updatedProfession: string = this.editProfessionForm.value

    this.ps.editProfession(this.profession!.id, updatedProfession).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.editProfessionForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err?.error?.message, 'Error', 3000)
      }
    })
  }

  private setProject(profession: Profession) {
    this.editProfessionForm.setValue({
      name: profession.name
    })
  }
}