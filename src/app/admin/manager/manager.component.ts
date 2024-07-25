import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ManagerModalComponent } from '../../modal/manager-modal/manager-modal.component';
import { ManagerTableComponent } from '../../components/table/manager-table/manager-table.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [NgIf, ManagerModalComponent, ManagerTableComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  public isModalVisible: boolean = false
  public count: number = 0

  constructor(){}

  showModal() {
    this.isModalVisible = true
  }

  cancelModal() {
    this.isModalVisible = false
  }

  confirmData() {
    this.isModalVisible = false
  }
}