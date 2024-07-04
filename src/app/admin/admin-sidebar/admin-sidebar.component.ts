import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserDataService } from '../../shared/user-data/user-data.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  constructor(private userService: UserDataService, private router: Router) {}

  logout(): void {
    this.userService.clearUserData()
    this.router.navigate(['/login'])
  }
}