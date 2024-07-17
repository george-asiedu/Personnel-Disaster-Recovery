import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EmergencyTypes, GetEmergencyTypes } from '../../../model/emergency-types';
import { AuthService } from '../../../auth/authService/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  protected baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private toast: NgToastService) {}

  private get httpOptions() {
    const accessToken = this.authService.currentUserValue?.data.token.accessToken
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    }
  }

  // private handleUnauthorizedError<T>(request: Observable<T>): Observable<T> {
  //   return this.authService.refreshToken().pipe(
  //     switchMap(() => {
  //       return request
  //     }),
  //     catchError(err => {
  //       this.authService.logout()
  //       return throwError(() => new Error('Unauthorized', err))
  //     })
  //   )
  // }

  // private makeAuthorizedRequest<T>(request: Observable<T>): Observable<T> {
  //   return request.pipe(
  //     catchError(err => {
  //       if (err.status === 401) {
  //         return this.handleUnauthorizedError(request)
  //       }
  //       return throwError(() => this.toast.warning('Unauthorized access', 'Unauthorize', 3000))
  //     })
  //   )
  // }

  createEmergency( name: string ): Observable<EmergencyTypes> {
    return this.http.post<EmergencyTypes>(`${this.baseUrl}/emergency-types`, name, this.httpOptions)
  }

  getEmergencies(page?: number, want?: string): Observable<GetEmergencyTypes> {
    return this.http.get<GetEmergencyTypes>(`${this.baseUrl}/emergency-types?page=${page}&want=${want}`, this.httpOptions)
  }

  editEmergency(id: number, type: EmergencyTypes): Observable<EmergencyTypes> {
    return this.http.put<EmergencyTypes>(`${this.baseUrl}/emergency-types/${id}`, type, this.httpOptions)
  }

  deleteEmergency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/emergency-types/${id}`, this.httpOptions)
  }
}