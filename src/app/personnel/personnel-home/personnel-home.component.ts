import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../service/personnel.service';
import { AuthService } from '../../auth/authService/auth.service';

@Component({
  selector: 'app-personnel-home',
  standalone: true,
  imports: [],
  templateUrl: './personnel-home.component.html',
  styleUrl: './personnel-home.component.scss'
})
export class PersonnelHomeComponent implements OnInit {
  public name: string | null = null
  public totalProjects: number = 0

  constructor(
    private ps: PersonnelService, 
    private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue
    if (currentUser) {
      const user = currentUser.data.user
      this.name = user.name
    }
    this.projects()
  }

  projects(): void {
    this.ps.getProjects(0).subscribe(response => {
      this.totalProjects = response.data.count
    })
  }
}