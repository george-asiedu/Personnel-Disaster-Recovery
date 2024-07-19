import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Login, LoginResponse } from '../../model/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf, 
    NgxSpinnerModule, 
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup
  public loading = false
  public isActive: boolean = false
  public showPassword: boolean = false

  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: NgToastService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    })
  } 

  login(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.spinner.show()

    const user: Login = this.loginForm.value

    this.as.Login(user).subscribe({
      next: (response: LoginResponse) => {   
        this.loading = false
        this.toast.success("Login successfully", response.message, 3000);
        this.loginForm.reset()
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
      },
      error: () => {
        this.loading = false
        this.toast.danger("Incorrect email or password", "Login error", 3000)
        this.spinner.hide()
      }
    })
  }

  rememberLogin(): void {
    this.isActive = !this.isActive
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword
  }
}