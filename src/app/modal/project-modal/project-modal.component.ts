import { Component, EventEmitter, Output } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nameValidator } from '../../validators/nameValidator';
import { PersonnelService } from '../../personnel/service/personnel.service';
import { NgToastService } from 'ng-angular-popup';
import { Project } from '../../model/project';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [SpinnerComponent, NgIf, ReactiveFormsModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  public loading: boolean = false
  public projectForm: FormGroup
  public charCount: number = 0
  public maxLength: number = 250

  constructor(
    private ps: PersonnelService,
    private toast: NgToastService,
    private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, nameValidator()]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLength)]]
    })
  }

  onSubmit(): void {
    if(this.projectForm.invalid) {
      return
    }

    this.loading = true
    const project: Project = this.projectForm.value

    this.ps.addProject(project).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.projectForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        this.toast.danger('Error adding project', 'Error', 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }

  updateCharacterCount(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.charCount = textarea.value.length

    if (this.charCount > this.maxLength) {
      textarea.value = textarea.value.substring(0, this.maxLength)
      this.charCount = this.maxLength
    }
    this.projectForm.get('description')?.setValue(
      textarea.value, { emitEvent: false }
    )
  }
}