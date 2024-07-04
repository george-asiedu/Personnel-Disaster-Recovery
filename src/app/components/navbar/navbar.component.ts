import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../shared/user-data/user-data.service';
import { LoginResponse } from '../../model/login';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userInitials: string = ''

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
      this.userService.user$.subscribe(
        (user: LoginResponse['data']['user'] | null) => {
          if(user) {
            this.userInitials = this.getInitials(user.name)
          }
        }
      )
  }

  getInitials(name: string): string {
    const [firstName, lastName] = name.split(' ')
    const initials = firstName.charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : '')
    return initials
  }
}