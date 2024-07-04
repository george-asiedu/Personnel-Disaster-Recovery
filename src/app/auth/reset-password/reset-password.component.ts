import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { ResetPassword } from '../../model/reset-password';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    NgxSpinnerModule, 
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup
  public loading = false
  public token: string

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.token = this.route.snapshot.queryParams['token']

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator as ValidatorFn })

  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  reset(): void {
    if(this.resetForm.invalid) {
      return
    }

    this.loading = true
    this.spinner.show()

    const reset: ResetPassword = this.resetForm.value

    this.as.resetPassword(this.token, reset).subscribe({
      next: () => {
        this.loading = false
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error('Reset password failed', err)
        this.loading = false
        this.spinner.show()
      }
    })
  }
}
