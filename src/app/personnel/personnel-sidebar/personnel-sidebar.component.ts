import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personnel-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './personnel-sidebar.component.html',
  styleUrl: './personnel-sidebar.component.scss'
})
export class PersonnelSidebarComponent {
  isSidebarCollapsed = false

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed
  }
}