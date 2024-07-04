import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-personnel-profile',
  standalone: true,
  imports: [NavbarComponent, ProfileFormComponent],
  templateUrl: './personnel-profile.component.html',
  styleUrl: './personnel-profile.component.scss'
})
export class PersonnelProfileComponent {

}
