import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-emergency-initiative-table',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgIf
  ],
  templateUrl: './emergency-initiative-table.component.html',
  styleUrl: './emergency-initiative-table.component.scss'
})
export class EmergencyInitiativeTableComponent {
  public isEditModalOpen: boolean = false

  public emergencies = [
    { managerName: 'George Asiedu', emergencyType: 'Security threat', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Pandemic', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Epidemic outbreaks', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Civil unrest', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Wildfire', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Health emergency', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Flood', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Industrial accident', date: 'May 9, 2024', location: '2 PINE STREET' },
    { managerName: 'George Asiedu', emergencyType: 'Infrastructural failure', date: 'May 9, 2024', location: '2 PINE STREET' }
  ]

  public isDropdownVisible: boolean[] = Array(this.emergencies.length).fill(false)

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) => (i === index ? !visible : false))
  }
}