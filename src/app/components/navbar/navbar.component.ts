import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authService/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = false
  public isDropdownOpen: boolean = false
  public userInitials: string = ''
  public username: string = ''
  public email: string = ''
  public image: string | null = null

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue
    if (currentUser) {
      const user = currentUser.data.user
      this.userInitials = this.getInitials(user.name)
      this.username = user.name
      this.email = user.email
      this.image = user.image
    }
  }

  getInitials(name: string): string {
    const [firstName, lastName] = name.split(' ')
    const initials = firstName.charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : '')
    return initials
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  accountSettings(): void {
    this.isDropdownOpen = false
  }

  logout(): void {
    this.authService.logout()
    this.isDropdownOpen = false
  }
}