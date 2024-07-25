import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PersonnelSidebarComponent } from '../personnel-sidebar/personnel-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-personnel-dashboard',
  standalone: true,
  imports: [
    NavbarComponent, 
    PersonnelSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './personnel-dashboard.component.html',
  styleUrl: './personnel-dashboard.component.scss'
})
export class PersonnelDashboardComponent {

}