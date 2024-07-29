import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authService/auth.service';
import { PersonnelService } from '../../personnel/service/personnel.service';
import { EmergencyService } from '../service/emergency/emergency.service';
import { ManagerService } from '../service/manager/manager.service';
import { ProfessionService } from '../service/profession/profession.service';

@Component({
  selector: 'app-admin-dashboard-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard-home.component.html',
  styleUrl: './admin-dashboard-home.component.scss'
})
export class AdminDashboardHomeComponent implements OnInit {
  public name: string | null = null
  public totalRegisteredPersonnel: number = 0
  public totalEmergenciesData: number = 0
  public totalVerifiedPersonnel: number = 0
  public totalManagers: number = 0
  public totalProfessions: number = 0

  constructor(
    private ps: PersonnelService,
    private es: EmergencyService,
    private mn: ManagerService,
    private prof: ProfessionService,
    private authService: AuthService) {}
  
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue
    if (currentUser) {
      const user = currentUser.data.user
      this.name = user.name
    }
    this.personnelData()
    this.totalEmergencies()
    this.professionsTotal()
    this.managersTotal()
  }

  personnelData(): void {
    this.ps.getPersonnelData(0).subscribe({
      next: (response) => {
        this.totalRegisteredPersonnel = response.count
        const verified = response.personnel.filter(state =>
          state.status === 'APPROVE' 
        )
        this.totalVerifiedPersonnel = verified.length
      }
    })
  }

  totalEmergencies(): void {
    this.es.getEmergencies(0).subscribe({
      next: (response) => {
        this.totalEmergenciesData = response.data.count
      }
    })
  }

  professionsTotal(): void {
    this.prof.getProfession(0).subscribe(response => {
      this.totalProfessions = response.data.count
    })
  }

  managersTotal(): void {
    this.mn.getManagers(0).subscribe(response => {
      this.totalManagers = response.data.count
    })
  }
}