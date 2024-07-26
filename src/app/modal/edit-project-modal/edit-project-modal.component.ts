import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Project, Projects } from '../../model/project';
import { PersonnelService } from '../../personnel/service/personnel.service';
import { nameValidator } from '../../validators/nameValidator';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-project-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpinnerComponent,
    NgIf
  ],
  templateUrl: './edit-project-modal.component.html',
  styleUrl: './edit-project-modal.component.scss'
})
export class EditProjectModalComponent implements OnChanges {
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  @Input() project: Projects | null = null
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.setProject(this.project)
    }
  }

  onUpdate(): void {
    if(this.projectForm.invalid) {
      return
    }

    this.loading = true
    const updatedProject: Project = this.projectForm.value

    this.ps.updateProject(this.project!.id, updatedProject).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.projectForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err?.error?.message, 'Error', 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }

  private setProject(project: Projects) {
    this.projectForm.setValue({
      title: project.title,
      description: project.description
    })
    this.charCount = project.description.length
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