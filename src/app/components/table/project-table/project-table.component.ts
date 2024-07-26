import { DatePipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../pagination/pagination.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NgToastService } from 'ng-angular-popup';
import { PersonnelService } from '../../../personnel/service/personnel.service';
import { Projects } from '../../../model/project';
import { EditProjectModalComponent } from '../../../modal/edit-project-modal/edit-project-modal.component';

@Component({
  selector: 'app-project-table',
  standalone: true,
  imports: [
    NgFor, 
    NgClass, 
    NgIf, 
    SpinnerComponent,
    PaginationComponent,
    EditProjectModalComponent,
    DatePipe,
    SlicePipe
  ],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss'
})
export class ProjectTableComponent implements OnInit {
  public projects: Projects[] = [] 
  public loading: boolean = true
  public isEditModalOpen: boolean = false
  public selectedProject: Projects | null = null
  public isDropdownVisible: boolean[] = []
  public totalProjects: number = 0
  public currentPage: number = 0 
  public pageSize: number = 9

  constructor(private toast: NgToastService, private ps: PersonnelService) {}
  
  ngOnInit(): void {
    this.fetchProjects(this.currentPage)    
  }

  fetchProjects(page: number): void {
    this.ps.getProjects(page).subscribe({
      next: (response) => {    
        this.loading = false
        this.projects = response.data.projects
        this.totalProjects = response.data.count
        this.isDropdownVisible = Array(this.projects.length).fill(false)
      }, error: () => {
        this.loading = false
        this.toast.danger('Failed to fetch projects', 'Error', 3000)
      }
    })
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) => 
      (i === index ? !visible : false))
  }

  openEditProject(project: Projects): void {
    this.selectedProject = project
    this.isEditModalOpen = true
  }

  closeEditProject(): void {
    this.isEditModalOpen = false
    this.selectedProject = null
  }

  onEditProjectSubmit(): void {
    this.isEditModalOpen = false
    this.fetchProjects(this.currentPage)
  }

  deleteProject(id: string) {
    this.ps.deleteProject(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.fetchProjects(this.currentPage)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err?.error?.message, 'Error', 3000)
      }
    })
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    this.fetchProjects(this.currentPage + 1)
  }
}