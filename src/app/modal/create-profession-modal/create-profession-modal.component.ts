import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ProfessionService } from '../../admin/service/profession/profession.service';
import { nameValidator } from '../../validators/nameValidator';
import { EmergencyService } from '../../admin/service/emergency/emergency.service';
import { EmergencyType } from '../../model/emergency-types';
import { CreateProfession } from '../../model/professions';

@Component({
  selector: 'app-create-profession-modal',
  standalone: true,
  imports: [
    SpinnerComponent, 
    NgIf, 
    ReactiveFormsModule, 
    NgFor
  ],
  templateUrl: './create-profession-modal.component.html',
  styleUrl: './create-profession-modal.component.scss'
})
export class CreateProfessionModalComponent implements OnInit{
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()
  public addProfessionForm: FormGroup
  public loading: boolean = false
  public emergency: EmergencyType[] = []

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private ps: ProfessionService,
    private es: EmergencyService
  ) {
    this.addProfessionForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      emergencyId: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getEmergency('all')
  }

  getEmergency(want: string): void {
    this.es.getEmergencies(undefined, want).subscribe({
      next: (response) => {
        this.emergency = response.data.emergencyTypes
      },
      error: () => {
        this.toast.danger("Failed to fetch emergency", "Error", 3000)
      }
    })
  }

  onSubmit() {
    if(this.addProfessionForm.invalid) {
      this.toast.warning('Please fill all the fields', 'Required fields', 3000)
      return
    }

    this.loading = true

    const type: CreateProfession = {
      ...this.addProfessionForm.value,
      emergencyId: Number(this.addProfessionForm.value.emergencyId)
    }

    this.ps.addProfession(type).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, "Success", 3000)
        this.submit.emit()
        this.addProfessionForm.reset()
      },
      error: (err) => {
        this.loading = false
        this.toast.danger("Error creating profession: " + (err?.error?.message || 'Unknown error'), "Error", 3000)
      }
    })
  }

  onCancel() {
    this.cancel.emit()
  }
}