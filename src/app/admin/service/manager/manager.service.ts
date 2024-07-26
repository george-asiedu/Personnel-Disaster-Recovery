import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GetManagerResponse, Manager, ManagerResponse } from '../../../model/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  protected baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  addManager(manager: Manager, image: File): Observable<ManagerResponse> {
    const formData = new FormData()
    formData.append('name', manager.name)
    formData.append('phoneNumber', manager.phoneNumber)
    formData.append('email', manager.email)
    formData.append('image', image)

    return this.http.post<ManagerResponse>(`${this.baseUrl}/managers`, formData)
  }

  getManagers(page: number, want?: string): Observable<GetManagerResponse> {
    return this.http.get<GetManagerResponse>(`${this.baseUrl}/managers?page=${page}&want=${want}`)
  }

  updateManager(id: string, manager: Manager): Observable<ManagerResponse> {
    return this.http.put<ManagerResponse>(`${this.baseUrl}/managers/${id}`, manager)
  }

  deleteManager(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/managers/${id}`)
  }
}