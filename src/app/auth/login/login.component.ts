import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Login, LoginResponse } from '../../model/login';
import { UserDataService } from '../../shared/user-data/user-data.service';

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
  loginForm: FormGroup
  public loading = false
  public isActive: boolean = false
  public showPassword: boolean = false

  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserDataService,
    private toast: NgToastService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    })
  } 

  login(): void {
    if(this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.spinner.show()

    const user: Login = this.loginForm.value

    this.as.Login(user).subscribe({
      next: (response: LoginResponse) => {   
        this.loading = false
        this.toast.success("Account registered successfully", response.message, 3000 )
        this.loginForm.reset()
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)

        this.userService.setUser(response.data.user)
        
        if(response.data.user.role === "ADMIN") {
          this.router.navigate(['/admin-page'])
        }  else {
          this.router.navigate(['/personnel-profile'])
        }     
      },
      error: () => {
        this.loading = false
        this.toast.danger("Login Failed", "Incorrect email or password", 3000 )
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