import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  public email: string = ''

  constructor(
    private as: AuthService, 
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation?.extras.state as { email: string }
    if (state && state.email) {
      this.email = state.email
    } else {
      this.toast.danger('Invalid or no email', "Email error", 3000)
    }
  }

  resendEmailConfirmation(): void {
    this.as.resendConfirmationEmail(this.email).subscribe({
      next: (response) => {
        this.toast.success(response.message, "Success", 3000 )
      },
      error: () => {
        this.toast.danger("Error sending email", "Error", 3000 )
      }
    })
  }
}