import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Register } from '../../model/register';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../authService/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { nameValidator } from '../../validators/nameValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import { confirmPasswordValidator } from '../../validators/confirmPasswordValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgIf,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup
  public loading: boolean = false

  constructor(
    private as: AuthService,
    private fb: FormBuilder, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private toast: NgToastService
  ) {  
      this.registerForm = this.fb.group({
        name: ['', [Validators.required, nameValidator()]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', Validators.required]
      }, { validators: confirmPasswordValidator('password', 'confirmPassword') })
  }

  register(): void {
    if(this.registerForm.invalid) {
      return
    }

    this.loading = true
    this.spinner.show()
    
    const newUser: Register = this.registerForm.value

    this.as.Register(newUser).subscribe(({
      next: () => {
        this.loading = false
        this.toast.success("Account registered successfully", "Success", 3000 )
        this.registerForm.reset()
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        this.router.navigate(['/verify-email'])
      },
      error: (err) => {
        this.loading = false
        this.toast.danger("Account registration failed", "Failed", 3000)
        this.spinner.hide()
        console.error('registration failed', err)
      }
    }))
  }
}