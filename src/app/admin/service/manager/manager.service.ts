import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Manager, ManagerResponse } from '../../../model/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  protected baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  addManager(manager: Manager): Observable<ManagerResponse> {
    return this.http.post<ManagerResponse>(`${this.baseUrl}/manager`, manager)
  }

  getManager(page: number, want: string): Observable<ManagerResponse> {
    return this.http.get<ManagerResponse>(`${this.baseUrl}/manager?page=${page}&want=${want}`)
  }
}