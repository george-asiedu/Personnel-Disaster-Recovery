import { Component, OnInit } from '@angular/core';
import { SuspendModalComponent } from '../../modal/suspend-modal/suspend-modal.component';
import { NgIf } from '@angular/common';
import { GetPersonnel, Personnel } from '../../model/profile';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../personnel/service/personnel.service';

@Component({
  selector: 'app-personnel-details',
  standalone: true,
  imports: [SuspendModalComponent, NgIf],
  templateUrl: './personnel-details.component.html',
  styleUrl: './personnel-details.component.scss'
})
export class PersonnelDetailsComponent implements OnInit {
  isSuspendModalVisible = false
  public personnel: Personnel | null = null
  public loading: boolean = true

  constructor(
    private route: ActivatedRoute,
    private ps: PersonnelService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log('id', id)
    if (id) {
      this.fetchPersonnelDetails(id)
    }
  }

  fetchPersonnelDetails(id: string) {
    this.ps.getPersonnelById(id).subscribe({
      next: (response) => {
        console.log('response id', id)
        
        this.loading = false
        this.personnel = response
      },
      error: () => {
        this.loading = false
      }
    })
  }

  showSuspendModal() {
    this.isSuspendModalVisible = true
  }

  cancelSuspend() {
    this.isSuspendModalVisible = false
  }

  confirmSuspend() {
    this.isSuspendModalVisible = false
    alert('Personnel suspended')
  }

}