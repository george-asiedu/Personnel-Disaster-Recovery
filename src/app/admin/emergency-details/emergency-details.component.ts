import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { GetEmergencyInitiativeById } from '../../model/emergency-initiative';
import { ActivatedRoute } from '@angular/router';
import { EmergencyInitiativeService } from '../service/emergency-initiative/emergency-initiative.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-emergency-details',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    SpinnerComponent,
    DatePipe,
  ],
  templateUrl: './emergency-details.component.html',
  styleUrl: './emergency-details.component.scss'
})
export class EmergencyDetailsComponent implements OnInit {
  public initiative: GetEmergencyInitiativeById | null = null
  public loading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private ems: EmergencyInitiativeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => {
        let id: string | null = param.get('id')
        if(id !== null) this.getEmergencyInitiative(id)
      }
    )
  }

  getEmergencyInitiative(id: string): void {
    this.loading = true
    this.ems.getEmergencyInitiativeById(id).subscribe({
      next: (response) => {
        console.log('response', response)
        this.loading = false
        this.initiative = response
        this.toast.success('Emergency details fetched successfully', 'Success', 3000)
      },
      error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
      }
    })
  }
}