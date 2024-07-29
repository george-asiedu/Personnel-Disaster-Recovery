import { Component, OnInit } from '@angular/core';
import { PersonnelTableComponent } from '../../components/table/personnel-table/personnel-table.component';
import { PersonnelService } from '../../personnel/service/personnel.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-personnels',
  standalone: true,
  imports: [PersonnelTableComponent, NgIf],
  templateUrl: './personnels.component.html',
  styleUrl: './personnels.component.scss'
})
export class PersonnelsComponent implements OnInit {
  public count: number = 0
  public loading: boolean = false

  constructor(private ps: PersonnelService) {}

  ngOnInit(): void {
    this.loading = true
    this.ps.getPersonnelData(0).subscribe(response => {
      this.loading = false
      this.count = response.count
    })
  }
}