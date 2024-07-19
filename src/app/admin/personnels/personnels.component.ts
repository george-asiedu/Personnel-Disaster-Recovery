import { Component } from '@angular/core';
import { PersonnelTableComponent } from '../../components/table/personnel-table/personnel-table.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-personnels',
  standalone: true,
  imports: [PersonnelTableComponent, PaginationComponent],
  templateUrl: './personnels.component.html',
  styleUrl: './personnels.component.scss'
})
export class PersonnelsComponent {
  
}