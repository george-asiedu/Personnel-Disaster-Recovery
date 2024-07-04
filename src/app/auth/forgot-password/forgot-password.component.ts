import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public loading: boolean = false
  forgotForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submitEmail(): void {
    if(this.forgotForm.invalid) {
      return
    }

    this.loading = true
    this.spinner.show
    const email: string = this.forgotForm.value

    this.as.submitEmail(email).subscribe({
      next: () => {
        this.loading = false
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        this.router.navigate(['/reset-password'])
        console.log('email sent', email)
      },
      error: () => {
        this.loading = false
        this.spinner.hide()
        console.error('email send fail', email)
      }
    })

  }
}