import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { nameValidator } from '../../validators/nameValidator';
import { EmergencyService } from '../../admin/service/emergency/emergency.service';
import { EmergencyType } from '../../model/emergency-types';
import { Profession } from '../../model/professions';
import { ProfessionService } from '../../admin/service/profession/profession.service';
import { EmergencyInitiative } from '../../model/emergency-initiative';
import { Managers } from '../../model/manager';
import { ManagerService } from '../../admin/service/manager/manager.service';
import { EmergencyInitiativeService } from '../../admin/service/emergency-initiative/emergency-initiative.service';

@Component({
  selector: 'app-create-initiative-modal',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIf,
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './create-initiative-modal.component.html',
  styleUrl: './create-initiative-modal.component.scss'
})
export class CreateInitiativeModalComponent implements OnInit {
  @Output() submit = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  public loading: boolean = false
  public initiateEmergencyForm: FormGroup
  public emergencies: EmergencyType[] = []
  public professions: Profession[] = []
  public managers: Managers[] = []
  public charCount: number = 0
  public maxLength: number = 150

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private es: EmergencyService,
    private ps: ProfessionService,
    private ms: ManagerService,
    private eis: EmergencyInitiativeService
  ) {
    this.initiateEmergencyForm = this.fb.group({
      managerId: [null, Validators.required],
      emergencyTypeId: [null, Validators.required],
      professions: [[], Validators.required],
      location: ['', [Validators.required, nameValidator()]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      dispatched_date: ['', Validators.required],
      end_date: ['', Validators.required],
      state: ['', Validators.required]
    })    
  }

  ngOnInit(): void {
    this.fetchEmergency('all')
    this.fetchProfession('all')
    this.fetchManager('all')
  }

  fetchEmergency(want: string): void {
    this.es.getEmergencies(0, want).subscribe({
      next: (response) => {
        this.emergencies = response.data.emergencyTypes
      },
      error: (err) => {
        this.toast.danger(err.error?.message, "Error", 3000)
      }
    })
  }

  fetchProfession(want: string): void {
    this.ps.getProfession(0, want).subscribe({
      next: (response) => {
        this.professions = response.data.professions
      },
      error: (err) => {
        this.toast.danger(err.error?.message, "Error", 3000)
      }
    })
  }

  fetchManager(want: string): void {
    this.ms.getManagers(0, want).subscribe({
      next: (response) => {
        this.managers = response.data.managers
      },
      error: (err) => {
        this.toast.danger(err.error?.message, "Error", 3000)
      }
    })
  }

  onSubmit(): void {
    if(this.initiateEmergencyForm.invalid) {
      return
    }

    this.loading = true
    const formData: EmergencyInitiative = {
      ...this.initiateEmergencyForm.value,
      managerId: +this.initiateEmergencyForm.value.managerId,
      emergencyTypeId: +this.initiateEmergencyForm.value.emergencyTypeId,
    }
    
    this.eis.initiateEmergency(formData).subscribe({
      next: (response) => {
        console.log('initiate', response)
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.initiateEmergencyForm.reset()
        this.submit.emit()
      }, error: (err) => {
        this.loading = false
        console.error('error', err)
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  onCancel(): void {
    this.cancel.emit()
  }

  updateCharacterCount(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.charCount = textarea.value.length

    if (this.charCount > this.maxLength) {
      textarea.value = textarea.value.substring(0, this.maxLength)
      this.charCount = this.maxLength
    }
    this.initiateEmergencyForm.get('description')?.setValue(
      textarea.value, { emitEvent: false }
    )
  }
}