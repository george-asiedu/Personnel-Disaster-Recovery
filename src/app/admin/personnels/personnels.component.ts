import { Component } from '@angular/core';
import { PersonnelTableComponent } from '../../components/table/personnel-table/personnel-table.component';

@Component({
  selector: 'app-personnels',
  standalone: true,
  imports: [PersonnelTableComponent],
  templateUrl: './personnels.component.html',
  styleUrl: './personnels.component.scss'
})
export class PersonnelsComponent {
  
}