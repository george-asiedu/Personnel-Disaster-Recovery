import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EditEmergencyModalComponent } from '../../../modal/edit-emergency-modal/edit-emergency-modal.component';
import { EmergencyService } from '../../../admin/service/emergency/emergency.service';
import { EmergencyType } from '../../../model/emergency-types';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { NgFor, NgClass, NgIf, DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-emergency-table',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgIf,
    EditEmergencyModalComponent,
    PaginationComponent,
    DatePipe,
    SpinnerComponent
  ],
  templateUrl: './emergency-table.component.html',
  styleUrls: ['./emergency-table.component.scss'],
})
export class EmergencyTableComponent implements OnInit {
  public isEditModalOpen: boolean = false
  public loading: boolean = false
  public emergencies: EmergencyType[] = []
  public isDropdownVisible: boolean[] = []
  public totalEmergencies: number = 0
  public currentPage: number = 0 
  public pageSize: number = 9
  public selectedEmergency: EmergencyType | null = null

  constructor(
    private toast: NgToastService,
    private es: EmergencyService
  ) {}

  ngOnInit(): void {
    this.fetchEmergencies(this.currentPage)
  }

  fetchEmergencies(page: number): void {
    this.loading = true
    this.es.getEmergencies(page).subscribe({
      next: (response) => {
        this.loading = false
        this.emergencies = response.data.emergencyTypes
        this.totalEmergencies = response.data.count
        this.isDropdownVisible = Array(this.emergencies.length).fill(false)
      },
      error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, "Error", 3000 )
      }
    })
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) =>
      i === index ? !visible : false
    )
  }

  OpenEditEmergency(emergency: EmergencyType) {
    this.selectedEmergency = emergency
    this.isEditModalOpen = true
  }

  closeEditEmergencyModal() {
    this.isEditModalOpen = false
    this.selectedEmergency = null
  }

  onEditEmergencySubmit() {
    this.isEditModalOpen = false
    this.fetchEmergencies(this.currentPage)
  }

  deleteEmergency(id: string) {
    this.es.deleteEmergency(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.fetchEmergencies(this.currentPage)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    this.fetchEmergencies(this.currentPage + 1)
  }
}