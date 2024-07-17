import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EditEmergencyModalComponent } from '../../../modal/edit-emergency-modal/edit-emergency-modal.component';

@Component({
  selector: 'app-emergency-table',
  standalone: true,
  imports: [
    NgFor, 
    NgClass, 
    NgIf, 
    EditEmergencyModalComponent
  ],
  templateUrl: './emergency-table.component.html',
  styleUrl: './emergency-table.component.scss'
})
export class EmergencyTableComponent {
  public isEditModalOpen: boolean = false
  public emergencies = [
    { emergencyType: 'Security threat', date: 'May 9, 2024', profession: 'Police', status: 'active' },
    { emergencyType: 'Pandemic', date: 'May 9, 2024', profession: ['Doctor', 'Nurse', 'Scientist', 'Receptionist'], status: 'completed' },
    { emergencyType: 'Epidemic outbreaks', date: 'May 9, 2024', profession: 'Nurse', status: 'completed' },
    { emergencyType: 'Civil unrest', date: 'May 9, 2024', profession: 'Lawyer', status: 'active' },
    { emergencyType: 'Wildfire', date: 'May 9, 2024', profession: 'Firefighter', status: 'active' },
    { emergencyType: 'Health emergency', date: 'May 9, 2024', profession: 'Doctor', status: 'completed' },
    { emergencyType: 'Flood', date: 'May 9, 2024', profession: 'Lifeguard', status: 'active' },
    { emergencyType: 'Industrial accident', date: 'May 9, 2024', profession: ['Engineers', 'Lawyer', 'IT Professional', 'Police', 'Scientist'], status: 'active' },
    { emergencyType: 'Infrastructural failure', date: 'May 9, 2024', profession: 'IT Professional', status: 'completed' }
  ]

  public isDropdownVisible: boolean[] = Array(this.emergencies.length).fill(false)
  public isProfessionsDropdownVisible: boolean[] = Array(this.emergencies.length).fill(false)

  constructor(private toast: NgToastService) {}

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) => (i === index ? !visible : false))
  }

  OpenEditEmergency() {
    this.isEditModalOpen = true
  }

  closeEditEmergencyModal() {
    this.isEditModalOpen = false
  }
  
  onEditEmergencySubmit() {
    this.isEditModalOpen = false
    this.toast.success("Emergency edited successfully", "Success", 3000)
  }

  deleteEmergency(emergency: any) {
    console.log('Deleting personnel...', emergency)
  }

  asArray(profession: string | string[]): string[] {
    return Array.isArray(profession) ? profession : [profession]
  }

  toggleProfessionsDropdown(index: number) {
    this.isProfessionsDropdownVisible = this.isProfessionsDropdownVisible.map(
      (visible, i) => (i === index ? !visible : false)
    )
  }

  showMoreThanTwo(professions: string[]): boolean {
    return professions.length > 2
  }
}