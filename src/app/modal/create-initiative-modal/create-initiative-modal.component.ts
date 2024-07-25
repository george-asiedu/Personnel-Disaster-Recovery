import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { nameValidator } from '../../validators/nameValidator';
import { EmergencyService } from '../../admin/service/emergency/emergency.service';
import { EmergencyType } from '../../model/emergency-types';

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
  public emergency: EmergencyType[] = []

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private es: EmergencyService
  ) {
    this.initiateEmergencyForm = this.fb.group({
      managerName: ['', [Validators.required, nameValidator()]],
      emergencyType: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchEmergency('all')
  }

  fetchEmergency(want: string): void {
    this.es.getEmergencies(0, 'all').subscribe({
      next: (response) => {
        this.emergency = response.data.emergencyTypes
      },
      error: () => {
        this.toast.danger("Failed to fetch emergency", "Error", 3000)
      }
    })
  }

  onSubmit(): void {
    if(this.initiateEmergencyForm.invalid) {
      return
    }

    this.loading = true

    const formData = this.initiateEmergencyForm.value

    this.submit.emit()
  }

  onCancel(): void {
    this.cancel.emit()
  }
}