import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectModalComponent } from '../../modal/project-modal/project-modal.component';
import { ProjectTableComponent } from '../../components/table/project-table/project-table.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, ProjectModalComponent, ProjectTableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public isModalVisible: boolean = false

  constructor() {}

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