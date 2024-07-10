import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  personnels = [
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 3, available: true, status: 'Pending' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 1, available: true, status: 'Verified' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 2, available: false, status: 'Pending' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 2, available: false, status: 'Verified' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 3, available: true, status: 'Pending' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 2, available: false, status: 'Verified' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 1, available: true, status: 'Pending' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 1, available: false, status: 'Verified' },
    { name: 'George Asiedu', email: 'asiedug41@gmail.com', date: 'May 9, 2024', title: 'Developer', score: 2, available: true, status: 'Suspend' }
  ];

  isDropdownVisible: boolean[] = Array(this.personnels.length).fill(false);

  constructor(private router: Router) {}

  toggleDropdown(index: number) {
    this.isDropdownVisible = this.isDropdownVisible.map((visible, i) => (i === index ? !visible : false));
  }

  viewDetails(personnel: any) {
    console.log('Viewing details...', personnel);
    this.router.navigate(['/admin-page/personnel-details'])
  }

  deletePersonnel(personnel: any) {
    console.log('Deleting personnel...', personnel);
  }
}