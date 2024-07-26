import { Component, OnInit } from '@angular/core';
import { Profession } from '../../../model/professions';
import { ProfessionService } from '../../../admin/service/profession/profession.service';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { EditProfessionModalComponent } from '../../../modal/edit-profession-modal/edit-profession-modal.component';

@Component({
  selector: 'app-profession-table',
  standalone: true,
  imports: [
    NgIf, 
    NgFor, 
    NgClass, 
    SpinnerComponent,
    PaginationComponent,
    DatePipe,
    EditProfessionModalComponent
  ],
  templateUrl: './profession-table.component.html',
  styleUrl: './profession-table.component.scss'
})
export class ProfessionTableComponent implements OnInit {
  public isEditModalOpen: boolean = false
  public loading: boolean = false
  public professions: Profession[] = []
  public isDropdownVisible: boolean[] = []
  public totalProfessions: number = 0
  public currentPage: number = 0 
  public pageSize: number = 9
  public selectedProfession: Profession | null = null

  constructor (
    private toast: NgToastService,
    private ps: ProfessionService) {}

  ngOnInit(): void {
    this.fetchProfessions(this.currentPage)
  }

  fetchProfessions(page: number): void {
    this.loading = true
    this.ps.getProfession(page).subscribe({
      next: (response) => {
        this.loading = false
        this.professions = response.data.professions
        this.totalProfessions = response.data.count
        this.isDropdownVisible = Array(this.professions.length).fill(false)
      }, error: (err) => {
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

  OpenEditProfession(profession: Profession) {
    this.selectedProfession = profession
    this.isEditModalOpen = true
  }

  closeProfessionModal() {
    this.isEditModalOpen = false
  }

  closeEditProfessionModal() {
    this.isEditModalOpen = false
    this.selectedProfession = null
  }

  onEditProfessionSubmit() {
    this.isEditModalOpen = false
    this.fetchProfessions(this.currentPage)
  }

  deleteProfession(id: string) {
    this.ps.deleteProfession(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.fetchProfessions(this.currentPage)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    this.fetchProfessions(this.currentPage + 1)
  }
}