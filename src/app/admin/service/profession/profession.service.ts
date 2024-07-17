import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { CreateProfession, GetProfession, Professions } from '../../../model/professions';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../auth/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {
  protected baseUrl: string = environment.baseUrl;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  private get httpOptions() {
    const accessToken = this.authService.currentUserValue?.data.token.accessToken;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    }
  }

  addProfession(type: CreateProfession): Observable<Professions> {
    return this.http.post<Professions>(`${this.baseUrl}/professions`, type, this.httpOptions)
  }

  getProfession(page: number): Observable<GetProfession> {
    return this.http.get<GetProfession>(`${this.baseUrl}/professions?page=${page}`, this.httpOptions)
  }

  editEmergency(id: number, type: CreateProfession): Observable<Professions> {
    return this.http.put<Professions>(`${this.baseUrl}/professions/${id}`, type, this.httpOptions)
  }

  deleteEmergency(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/professions/${id}`, this.httpOptions)
  }
}