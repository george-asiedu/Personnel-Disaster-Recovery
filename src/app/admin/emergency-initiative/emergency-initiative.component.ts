import { Component, OnInit } from '@angular/core';
import { EmergencyInitiativeTableComponent } from '../../components/table/emergency-initiative-table/emergency-initiative-table.component';
import { NgIf } from '@angular/common';
import { CreateInitiativeModalComponent } from '../../modal/create-initiative-modal/create-initiative-modal.component';
import { NgToastService } from 'ng-angular-popup';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EmergencyInitiativeService } from '../service/emergency-initiative/emergency-initiative.service';

@Component({
  selector: 'app-emergency-initiative',
  standalone: true,
  imports: [
    EmergencyInitiativeTableComponent,
    NgIf,
    CreateInitiativeModalComponent,
    PaginationComponent
  ],
  templateUrl: './emergency-initiative.component.html',
  styleUrl: './emergency-initiative.component.scss'
})
export class EmergencyInitiativeComponent implements OnInit {
  public isModalVisible: boolean = false
  public count: number = 0
  public loading: boolean = false

  constructor(private ems: EmergencyInitiativeService) {}

  ngOnInit(): void {
    this.loading = true
    this.ems.getEmergencyInitiatives(0).subscribe(response => {
      this.loading = false
      this.count = response.data.count
    })
  }

  showModal(): void {
    this.isModalVisible = true
  }

  cancelModal(): void {
    this.isModalVisible = false
  }

  onSubmit(): void {
    this.isModalVisible = false
  }
}