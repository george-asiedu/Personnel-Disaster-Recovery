import { Component } from '@angular/core';
import { SuspendModalComponent } from '../../modal/suspend-modal/suspend-modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-personnel-details',
  standalone: true,
  imports: [SuspendModalComponent, NgIf],
  templateUrl: './personnel-details.component.html',
  styleUrl: './personnel-details.component.scss'
})
export class PersonnelDetailsComponent {
  isSuspendModalVisible = false;

  showSuspendModal() {
    this.isSuspendModalVisible = true;
  }

  cancelSuspend() {
    this.isSuspendModalVisible = false;
  }

  confirmSuspend() {
    // Add your suspend logic here
    this.isSuspendModalVisible = false;
    alert('Personnel suspended');
  }

}
