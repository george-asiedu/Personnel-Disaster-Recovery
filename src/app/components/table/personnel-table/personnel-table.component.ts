import { NgFor, NgClass, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Personnel } from '../../../model/profile';
import { NgToastService } from 'ng-angular-popup';
import { PersonnelService } from '../../../personnel/service/personnel.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-personnel-table',
  standalone: true,
  imports: [
    NgFor, 
    NgClass, 
    NgIf, 
    RouterLink,
    SpinnerComponent,
    PaginationComponent,
    DatePipe
  ],
  templateUrl: './personnel-table.component.html',
  styleUrl: './personnel-table.component.scss'
})
export class PersonnelTableComponent implements OnInit {
  public personnelDetails: Personnel[] = [] 
  public loading: boolean = true
  public isEditModalOpen: boolean = false
  public isDropdownVisible: boolean[] = []
  public totalPersonnel: number = 0
  public currentPage: number = 0 
  public pageSize: number = 9
  

  constructor(
    private toast: NgToastService,
    private ps: PersonnelService) {}

  ngOnInit(): void {
    this.fetchPersonnels(this.currentPage)    
  }

  fetchPersonnels(page: number): void {
    this.ps.getPersonnelData(page).subscribe({
      next: (response) => {    
        this.loading = false
        this.personnelDetails = response.personnel
        this.totalPersonnel = response.count
        this.isDropdownVisible = Array(this.personnelDetails.length).fill(false)
      }, error: () => {
        this.loading = false
        this.toast.danger('Failed to fetch personnel data', 'Error', 3000)
      }
    })
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) => 
      (i === index ? !visible : false))
  }

  deletePersonnel(id: string) {
    const confirmDeletion = window.confirm('Are you sure you want to delete this personnel?')
    if (!confirmDeletion) {
      return
    }

    this.ps.deletePersonnelProfile(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.fetchPersonnels(this.currentPage)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    this.fetchPersonnels(this.currentPage + 1)
  }
}