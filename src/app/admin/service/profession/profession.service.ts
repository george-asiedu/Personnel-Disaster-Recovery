import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GetProfession, ProfessionsResponse } from '../../../model/professions';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {
  protected baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) {}

  addProfession(name: string): Observable<ProfessionsResponse> {
    return this.http.post<ProfessionsResponse>(`${this.baseUrl}/professions`, name)
  }

  getProfession(page: number, want?: string): Observable<GetProfession> {
    return this.http.get<GetProfession>(`${this.baseUrl}/professions?page=${page}&want=${want}`)
  }

  editProfession(id: string, name: string): Observable<ProfessionsResponse> {
    return this.http.put<ProfessionsResponse>(`${this.baseUrl}/professions/${id}`, name)
  }

  deleteProfession(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/professions/${id}`)
  }
}