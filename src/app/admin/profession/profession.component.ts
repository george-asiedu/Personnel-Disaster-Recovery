import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CreateProfessionModalComponent } from '../../modal/create-profession-modal/create-profession-modal.component';
import { ProfessionTableComponent } from '../../components/table/profession-table/profession-table.component';
import { ProfessionService } from '../service/profession/profession.service';

@Component({
  selector: 'app-profession',
  standalone: true,
  imports: [
    NgIf,
    CreateProfessionModalComponent,
    ProfessionTableComponent
  ],
  templateUrl: './profession.component.html',
  styleUrl: './profession.component.scss'
})
export class ProfessionComponent implements OnInit {
  public isProfessionModalOpen: boolean = false
  public count: number = 0
  public loading: boolean = false

  constructor(private ps: ProfessionService) {}

  ngOnInit(): void {
    this.loading = true
    this.ps.getProfession(0).subscribe(response => {
      this.loading = false
      this.count = response.data.count
    })
  }

  showProfessionModal() {
    this.isProfessionModalOpen = true
  }

  closeProfessionModal() { 
    this.isProfessionModalOpen = false
  }

  onSubmit() {
    this.isProfessionModalOpen = false
  }
}