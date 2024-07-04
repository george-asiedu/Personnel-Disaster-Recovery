import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../authService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [SpinnerComponent, NgIf],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.scss'
})
export class EmailConfirmationComponent implements OnInit {
  public token: string

  constructor(
    private as: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) {
    this.token = this.route.snapshot.queryParams['token']
  }
  ngOnInit(): void {
      this.as.confirmEmail(this.token).subscribe({
        next: (response) => {
          console.log('Response', response)
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 3000)
        }
      })
  }
}