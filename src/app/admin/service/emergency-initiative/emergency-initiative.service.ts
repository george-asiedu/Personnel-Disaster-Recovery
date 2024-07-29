import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { EmergencyInitiative, EmergencyInitiativeResponse, GetEmergencyInitiative, GetEmergencyInitiativeById } from '../../../model/emergency-initiative';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmergencyInitiativeService {
  protected baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  initiateEmergency(initiate: EmergencyInitiative): Observable<EmergencyInitiativeResponse> {
    return this.http.post<EmergencyInitiativeResponse>(`${this.baseUrl}/emergency-initiatives`, initiate)
  }

  getEmergencyInitiatives(page: number, want?: string): Observable<GetEmergencyInitiative> {
    return this.http.get<GetEmergencyInitiative>(`${this.baseUrl}/emergency-initiatives?page=${page}&want=${want}`)
  }

  approveEmergencyInitiative(id: string): Observable<{ message: string}> {
    return this.http.post<{message: string}>(`${this.baseUrl}/emergency-initiatives/${id}/approve`, {})
  }

  getEmergencyInitiativeById(id: string): Observable<GetEmergencyInitiativeById> {
    return this.http.get<GetEmergencyInitiativeById>(`${this.baseUrl}/emergency-initiatives/${id}`)
  }
}