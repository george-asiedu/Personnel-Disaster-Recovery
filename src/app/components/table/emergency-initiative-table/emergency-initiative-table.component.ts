import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../pagination/pagination.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { EmergencyInitiativeService } from '../../../admin/service/emergency-initiative/emergency-initiative.service';
import { NgToastService } from 'ng-angular-popup';
import { Initiative } from '../../../model/emergency-initiative';
import { AuthService } from '../../../auth/authService/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-emergency-initiative-table',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgIf,
    PaginationComponent,
    SpinnerComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './emergency-initiative-table.component.html',
  styleUrl: './emergency-initiative-table.component.scss'
})
export class EmergencyInitiativeTableComponent implements OnInit {
  public loading: boolean = false
  public initiative: Initiative[] = []
  public isDropdownVisible: boolean[] = []
  public totalInitiative: number = 0
  public currentPage: number = 0 
  public pageSize: number = 9
  public role: string = ''
  
  constructor(
    private toast: NgToastService,
    private eis: EmergencyInitiativeService,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    this.getEmergencyInitiative(this.currentPage) 
    this.getUserRole()
  }

  getEmergencyInitiative(page: number): void {
    this.loading = true
    this.eis.getEmergencyInitiatives(page).subscribe({
      next: (response) => {
        this.loading = false
        this.initiative = response.data.initiatives
        this.totalInitiative = response.data.count
        this.isDropdownVisible = Array(this.initiative.length).fill(false)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) =>
      i === index ? !visible : false
    )
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    this.getEmergencyInitiative(this.currentPage + 1)
  }

  getUserRole(): void {
    const currentUser = this.as.currentUserValue
    if(currentUser) {
      const userRole = currentUser.data.user.role
      this.role = userRole  
    }
  }

  approveEmergency(id: string): void {
    this.eis.approveEmergencyInitiative(id).subscribe({
      next: (response) => {
        this.toast.success(response.message, 'Success', 3000)
        this.getEmergencyInitiative(this.currentPage)
      },
      error: (err) => {
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    });
  }
}