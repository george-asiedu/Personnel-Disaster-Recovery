import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { ResetPassword } from '../../model/reset-password';
import { NgToastService } from 'ng-angular-popup';
import { passwordValidator } from '../../validators/passwordValidator';
import { confirmPasswordValidator } from '../../validators/confirmPasswordValidator';

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
  public loading: boolean = false
  public token: string
  public showPassword: boolean = false
  public showConfirmPassword: boolean = false

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthService,
    private spinner: NgxSpinnerService,
    private toast: NgToastService
  ) {
    this.token = this.route.snapshot.queryParams['token']

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validators: confirmPasswordValidator('password', 'confirmPassword') })
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
        this.toast.success('Password reset successful', "Success", 3000)
        this.resetForm.reset()
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.loading = false
        this.toast.danger("Password reset failed", "Failed", 3000)
        this.spinner.show()
      }
    })
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword
  }
}