import { Component } from '@angular/core';
import { EmergencyInitiativeTableComponent } from '../../components/table/emergency-initiative-table/emergency-initiative-table.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-emergency-initiative',
  standalone: true,
  imports: [
    EmergencyInitiativeTableComponent,
    NgIf
  ],
  templateUrl: './emergency-initiative.component.html',
  styleUrl: './emergency-initiative.component.scss'
})
export class EmergencyInitiativeComponent {
  showModal(): void {

  }

  cancelModal(): void {

  }

  onSubmit(): void {

  }
}