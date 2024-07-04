import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../authService/auth.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { Login } from '../../model/login';

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

  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
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
      next: (response) => {   
        console.log(response)
        this.loading = false
        this.toast.success("Account registered successfully", response.message, 3000 )
        this.loginForm.reset()
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        
        if(response.data.user.role === "ADMIN") {
          this.router.navigate(['/admin-page'])
        }  else {
          this.router.navigate(['/personnel-profile'])
        }     
      },
      error: (err) => {
        this.loading = false
        this.toast.danger("Login Failed", err.message, 3000 )
        this.spinner.hide()
        console.error('Error logging in', err)
      }
    })
  }

  rememberLogin(): void {
    this.isActive = !this.isActive
  }
}