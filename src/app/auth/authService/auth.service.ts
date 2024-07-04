import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'
import { Register } from '../../model/register';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from '../../model/login';
import { ResetPassword } from '../../model/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected baseURL = environment.baseUrl
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  Register(user: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseURL}/auth/register`, user, this.httpOptions)
  }

  Login(user: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}/auth/login`, user, this.httpOptions)
  }

  submitEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseURL}/auth/forgot-password`, email, this.httpOptions)
  }

  resetPassword(token: string, reset: ResetPassword): Observable<ResetPassword> {
    return this.http.post<ResetPassword>(`${this.baseURL}/auth/reset-password?token=${token}`, reset, this.httpOptions)
  }

  confirmEmail(token: string): Observable<{ message: string }> {
    console.log('confirm email', token)
    return this.http.get<{ message: string }>(`${this.baseURL}/auth/account-verification?token=${token}`)
  }
}