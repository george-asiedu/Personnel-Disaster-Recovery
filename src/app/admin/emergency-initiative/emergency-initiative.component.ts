import { Component } from '@angular/core';
import { EmergencyInitiativeTableComponent } from '../../components/table/emergency-initiative-table/emergency-initiative-table.component';
import { NgIf } from '@angular/common';
import { CreateInitiativeModalComponent } from '../../modal/create-initiative-modal/create-initiative-modal.component';
import { NgToastService } from 'ng-angular-popup';
import { PaginationComponent } from '../../components/pagination/pagination.component';

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
export class EmergencyInitiativeComponent {
  public isModalVisible: boolean = false

  constructor(private toast: NgToastService) {}

  showModal(): void {
    this.isModalVisible = true
  }

  cancelModal(): void {
    this.isModalVisible = false
  }

  onSubmit(): void {
    this.isModalVisible = false
    this.toast.success("Emergency initiated successfully", "Success", 3000)
  }
}