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

  constructor(
    private ps: PersonnelService,
    private toast: NgToastService,
    private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, nameValidator()]],
      description: ['', Validators.required]
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
}