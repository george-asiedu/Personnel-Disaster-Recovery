import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ManagerModalComponent } from '../../modal/manager-modal/manager-modal.component';
import { ManagerTableComponent } from '../../components/table/manager-table/manager-table.component';
import { ManagerService } from '../service/manager/manager.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [NgIf, ManagerModalComponent, ManagerTableComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent implements OnInit {
  public isModalVisible: boolean = false
  public count: number = 0
  public loading: boolean = false

  constructor(private mn: ManagerService){}

  ngOnInit(): void {
    this.loading = true
    this.mn.getManagers(0).subscribe(response => {
      this.loading = false
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
  }
}