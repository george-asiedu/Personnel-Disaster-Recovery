import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { EmergencyTypes, GetEmergencyTypes } from '../../../model/emergency-types';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  protected baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) {}

  createEmergency( name: string ): Observable<EmergencyTypes> {
    return this.http.post<EmergencyTypes>(`${this.baseUrl}/emergency-types`, name)
  }

  getEmergencies(page: number, want?: string): Observable<GetEmergencyTypes> {
    return this.http.get<GetEmergencyTypes>(`${this.baseUrl}/emergency-types?page=${page}&want=${want}`)
  }

  editEmergency(id: string, type: EmergencyTypes): Observable<EmergencyTypes> {
    return this.http.put<EmergencyTypes>(`${this.baseUrl}/emergency-types/${id}`, type)
  }

  deleteEmergency(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/emergency-types/${id}`)
  }
}