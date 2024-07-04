import { NgClass, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Profile } from '../../model/profile';
import { UserDataService } from '../../shared/user-data/user-data.service';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { PhoneNumberDirective } from '../../directive/phone-number/phone-number.directive';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    NgClass, 
    ReactiveFormsModule, 
    NgSwitch, 
    NgSwitchCase, 
    NgIf,
    SpinnerComponent,
    PhoneNumberDirective
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
  public profileForm: FormGroup
  public currentStep = 1
  public loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private userService: UserDataService) {
      this.profileForm = this.fb.group({
      
        name: [{ value: this.userService.getUser()?.name, disabled: true }],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
        houseAddress: ['', Validators.required],
        photograph: ['', Validators.required],

        jobTitle: ['', Validators.required],
        department: ['', Validators.required],
        employeeId: ['', Validators.required],
        currentPosition: ['', Validators.required],
        yearsOfExperience: ['', Validators.required],
        currentWorkplace: ['', Validators.required],
        employerEmail: ['', [Validators.required, Validators.email]],

        qualification: ['', Validators.required],
        fieldOfStudy: ['', Validators.required],

        areaOfExpertise: ['', Validators.required],
        skills: ['', Validators.required],
        projectsUndertaken: ['', Validators.required],

        languageSpoken: ['', Validators.required],
        hobbies: ['', Validators.required],
        interest: ['', Validators.required]
    })
  }

  nextStep() {
    if (this.currentStep < 5 ) {
      this.currentStep++
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return
    }

    this.loading = true

    const profileData: Profile = this.profileForm.value

    
  }
}