import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { PersonnelDetails } from '../../model/profile';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../personnel/service/personnel.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-personnel-details',
  standalone: true,
  imports: [
    NgIf, 
    NgFor, 
    SpinnerComponent,
    DatePipe
  ],
  templateUrl: './personnel-details.component.html',
  styleUrl: './personnel-details.component.scss'
})
export class PersonnelDetailsComponent implements OnInit {
  public personnel: PersonnelDetails = {} as PersonnelDetails
  public loading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private ps: PersonnelService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => {
        let id: string | null = param.get('id')
        if(id !== null) this.fetchPersonnelDetails(id)
      })
  }

  fetchPersonnelDetails(id: string) {
    this.loading = true
    this.ps.getPersonnelById(id).subscribe({
      next: (response) => {
        this.loading = false
        this.personnel = response
        this.toast.success('Personnel details fetched successfully', 'Success', 3000)
      },
      error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  verifyPersonnel(id: string): void {
    this.loading = true
    this.ps.verifyPersonnel(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
      }, error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }

  deletePersonnel(id: string): void {
    const confirmDeletion = window.confirm('Are you sure you want to delete this personnel?')
    if (!confirmDeletion) {
      return
    }
    this.loading = true
    this.ps.deletePersonnelProfile(id).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
      },
      error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }
}