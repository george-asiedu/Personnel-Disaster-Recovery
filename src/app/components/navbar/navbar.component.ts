import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../shared/user-data/user-data.service';
import { LoginResponse } from '../../model/login';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = false
  public isDropdownOpen: boolean = false
  public userInitials: string = ''
  public username: string = ''
  public email: string = ''

  constructor(private userService: UserDataService, private router: Router) {}

  ngOnInit(): void {
      this.userService.user$.subscribe(
        (user: LoginResponse['data']['user'] | null) => {      
          if(user) {
            this.userInitials = this.getInitials(user.name)
            this.username = user.name
            this.email = user.email
          }
        }
      )
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
    this.userService.clearUserData()
    this.isDropdownOpen = false
    this.router.navigate(['/login'])
  }
}