import { Component } from '@angular/core';
import { CreateEmergencyModalComponent } from '../../modal/create-emergency-modal/create-emergency-modal.component';
import { NgIf } from '@angular/common';
import { CreateProfessionModalComponent } from '../../modal/create-profession-modal/create-profession-modal.component';
import { NgToastService } from 'ng-angular-popup';
import { EmergencyTableComponent } from '../../components/table/emergency-table/emergency-table.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    CreateEmergencyModalComponent, 
    NgIf,
    CreateProfessionModalComponent,
    EmergencyTableComponent,
    PaginationComponent
  ],
  templateUrl:      './emergency.component.html',
  styleUrl: './emergency.component.scss'
})
export class EmergencyComponent {
  public isModalVisible: boolean = false
  public isProfessionModalOpen: boolean = false

  constructor(private toast: NgToastService) {}

  showModal() {
    this.isModalVisible = true
  }

  showProfessionModal() {
    this.isProfessionModalOpen = true
  }

  cancelModal() {
    this.isModalVisible = false
  }

  closeProfessionModal() { 
    this.isProfessionModalOpen = false
  }

  confirmData() {
    this.isModalVisible = false
    this.toast.success("Personnel suspended successfully", "Success", 3000)
  }

  onSubmit() {
    this.isProfessionModalOpen = false
    this.toast.success("Personnel created successfully", "Success", 3000)
  }
}
