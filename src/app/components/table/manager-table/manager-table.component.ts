import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PaginationComponent } from '../../pagination/pagination.component';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ManagerService } from '../../../admin/service/manager/manager.service';
import { Managers } from '../../../model/manager';
import { EditManagerModalComponent } from '../../../modal/edit-manager-modal/edit-manager-modal.component';

@Component({
  selector: 'app-manager-table',
  standalone: true,
  imports: [
    PaginationComponent,
    NgIf,
    NgClass,
    NgFor,
    SpinnerComponent,
    DatePipe,
    EditManagerModalComponent
  ],
  templateUrl: './manager-table.component.html',
  styleUrl: './manager-table.component.scss'
})
export class ManagerTableComponent implements OnInit {
  public isEditModalOpen: boolean = false
  public loading: boolean = false
  public managers: Managers[] = []
  public isDropdownVisible: boolean[] = []
  public totalManagers: number = 0
  public currentPage: number = 0 
  public pageSize: number = 9
  public selectedManager: Managers | null = null

  constructor(
    private toast: NgToastService,
    private ms: ManagerService
  ) {}

  ngOnInit(): void {
    this.fetchManagers(this.currentPage)
  }

  fetchManagers(page: number): void {
    this.loading = true
    this.ms.getManagers(page).subscribe({
      next: (response) => {
        this.loading = false
        this.managers = response.data.managers
        this.totalManagers = response.data.count
        this.isDropdownVisible = Array(this.managers.length).fill(false)
      },
      error: () => {
        this.loading = false
        this.toast.danger('Failed to fetch managers', "Error", 3000)
      }
    })
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) =>
      i === index ? !visible : false
    )
  }

  OpenEditManager(manager: Managers) {
    this.selectedManager = manager
    this.isEditModalOpen = true
  }

  closeEditManagerModal() {
    this.isEditModalOpen = false
    this.selectedManager = null
  }

  onEditManagerSubmit() {
    this.isEditModalOpen = false
    this.fetchManagers(this.currentPage)
  }

  deleteManager(id: string) {
    this.ms.deleteManager(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.fetchManagers(this.currentPage)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    this.fetchManagers(this.currentPage + 1)
  }
}