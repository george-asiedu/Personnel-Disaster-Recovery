import { Component, OnInit } from '@angular/core';
import { PersonnelTableComponent } from '../../components/table/personnel-table/personnel-table.component';
import { PersonnelService } from '../../personnel/service/personnel.service';

@Component({
  selector: 'app-personnels',
  standalone: true,
  imports: [PersonnelTableComponent],
  templateUrl: './personnels.component.html',
  styleUrl: './personnels.component.scss'
})
export class PersonnelsComponent implements OnInit {
  public count: number = 0

  constructor(private ps: PersonnelService) {}

  ngOnInit(): void {
    this.ps.getPersonnelData(0).subscribe(response => {
      this.count = response.count
    })
  }
}