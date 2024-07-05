import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
    private spinner: NgxSpinnerService,
    private router: Router,
    private toast: NgToastService
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
    this.spinner.show()

    const email: string = this.forgotForm.value

    this.as.submitEmail(email).subscribe({
      next: () => {
        this.loading = false
        this.toast.success('Email sent successfully', 'success', 3000)
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        this.router.navigate(['/reset-email'])
      },
      error: () => {
        this.loading = false
        this.toast.danger('Email sent failed', 'Failed', 3000)
        this.spinner.hide()
      }
    })

  }
}