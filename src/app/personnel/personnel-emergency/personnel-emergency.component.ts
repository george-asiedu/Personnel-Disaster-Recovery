import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EmergencyInitiativeTableComponent } from '../../components/table/emergency-initiative-table/emergency-initiative-table.component';
import { EmergencyInitiativeService } from '../../admin/service/emergency-initiative/emergency-initiative.service';

@Component({
  selector: 'app-personnel-emergency',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    SpinnerComponent,
    PaginationComponent,
    EmergencyInitiativeTableComponent
  ],
  templateUrl: './personnel-emergency.component.html',
  styleUrl: './personnel-emergency.component.scss'
})
export class PersonnelEmergencyComponent implements OnInit{
  public count: number = 0
  public loading: boolean = false

  constructor(private em: EmergencyInitiativeService) {}

  ngOnInit(): void {
    this.loading = true
    this.em.getEmergencyInitiatives(0).subscribe(response => {
      this.loading = false
      this.count = response.data.count
    })
  }
}