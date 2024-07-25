import { Component, OnInit } from '@angular/core';
import { CreateEmergencyModalComponent } from '../../modal/create-emergency-modal/create-emergency-modal.component';
import { NgIf } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { EmergencyTableComponent } from '../../components/table/emergency-table/emergency-table.component';
import { EmergencyService } from '../service/emergency/emergency.service';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    CreateEmergencyModalComponent, 
    NgIf,
    EmergencyTableComponent,
  ],
  templateUrl:      './emergency.component.html',
  styleUrl: './emergency.component.scss'
})
export class EmergencyComponent implements OnInit {
  public isModalVisible: boolean = false
  public count: number = 0

  constructor(private toast: NgToastService, private es: EmergencyService) {}

  ngOnInit(): void {
    this.es.getEmergencies(0).subscribe(response => {
      this.count = response.data.count
    })
  }

  showModal() {
    this.isModalVisible = true
  }

  cancelModal() {
    this.isModalVisible = false
  }

  confirmData() {
    this.isModalVisible = false
    this.toast.success("Personnel suspended successfully", "Success", 3000)
  }
}