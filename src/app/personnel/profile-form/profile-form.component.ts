import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Profile } from '../../model/profile';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { nameValidator } from '../../validators/nameValidator';
import { Profession } from '../../model/professions';
import { ProfessionService } from '../../admin/service/profession/profession.service';
import { PersonnelService } from '../service/personnel.service';
import { numberValidator } from '../../validators/numberValidator';
import { AuthService } from '../../auth/authService/auth.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    NgClass, 
    ReactiveFormsModule, 
    NgSwitch, 
    NgSwitchCase, 
    NgIf,
    NgFor,
    SpinnerComponent
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnInit {
  public profileForm: FormGroup
  public currentStep = 1
  public loading: boolean = false
  private unsavedChanges: boolean = false
  public professions: Profession[] = []

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private as: AuthService,
    private ps: ProfessionService,
    private personnelService: PersonnelService) {
      this.profileForm = this.fb.group({      
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
        houseNumber: ['', Validators.required],
        town: ['', [Validators.required, nameValidator()]],
        digitalAddress: ['', Validators.required],
        professionId: ['', [Validators.required, numberValidator()]],
        employeeId: ['', Validators.required],
        employerName: ['', [Validators.required, nameValidator()]],
        currentPosition: ['', Validators.required],
        experienceYears: ['', [Validators.required, numberValidator()]],
        employerEmail: ['', [Validators.required, Validators.email]],
        qualification: ['', [Validators.required, nameValidator()]],
        studyField: ['', [Validators.required, nameValidator()]],
        graduationYear: ['', [Validators.required, numberValidator()]],
        userId: ['']
    })
  }

  ngOnInit(): void {
    this.getUserData()
    this.getProfessions('all')
  }

  getUserData(): void {
    const currentUser = this.as.currentUserValue
    if(currentUser) {
      const user = currentUser.data.user
      this.profileForm.patchValue({
        userId: user.id
      })
    }
  }

  getProfessions(want: string): void {
    this.ps.getProfession(0, want).subscribe({
      next: (response) => {
        this.professions = response.data.professions
      },
      error: () => {
        this.toast.danger("Failed to fetch professions", "Error", 3000)
      }
    })
  }

  nextStep() {
    if (this.currentStep < 4 ) {
      this.currentStep++
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  saveChanges() {
    this.unsavedChanges = false
  }

  hasUnsavedChanges(): boolean {
    return this.unsavedChanges
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return
    }

    const confirmSubmission = window.confirm('Are you sure you want to submit the form? This data cannot be updated later.')

    if (!confirmSubmission) {
      return
    }

    this.loading = true
    const data: Profile = {
      ...this.profileForm.value,
      professionId: Number(this.profileForm.value.professionId),
      graduationYear: Number(this.profileForm.value.graduationYear),
      experienceYears: Number(this.profileForm.value.experienceYears)
    }

    this.personnelService.personnelProfile(data).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, "Success", 3000)
        this.profileForm.reset()
        setTimeout(() => {
          this.router.navigateByUrl('/personnel-dashboard')
        }, 2000)
      },
      error: (err) => {
        this.loading = false
        console.error(err?.error?.message)
        this.toast.danger(
          'Error creating personnel profile', 
          "Error", 
          3000
        )
      }
    })
  }
}