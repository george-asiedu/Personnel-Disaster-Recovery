import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectModalComponent } from '../../modal/project-modal/project-modal.component';
import { ProjectTableComponent } from '../../components/table/project-table/project-table.component';
import { PersonnelService } from '../service/personnel.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, ProjectModalComponent, ProjectTableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  public isModalVisible: boolean = false
  public loading: boolean = false
  public count: number = 0

  constructor(private ps: PersonnelService) {}

  ngOnInit(): void {
    this.loading = true
    this.ps.getProjects(0).subscribe(response => {
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