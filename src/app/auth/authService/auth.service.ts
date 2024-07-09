import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'
import { Register } from '../../model/register';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login, LoginResponse, Role } from '../../model/login';
import { ResetPassword } from '../../model/reset-password';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected baseURL = environment.baseUrl
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private currentUserSubject: BehaviorSubject<LoginResponse | null>
  public currentUser: Observable<LoginResponse | null>

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('currentUser')!))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value
  }

  Register(user: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseURL}/auth/register`, user, this.httpOptions)
  }

  Login(user: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}/auth/login`, user, this.httpOptions)
    .pipe(
      map((response: LoginResponse) => {
        localStorage.setItem('currentUser', JSON.stringify(response))
        this.currentUserSubject.next(response)
        
        if (response.data.user.role === Role.ADMIN) {
          this.router.navigate(['/admin-page'])
        } else if (response.data.user.role === Role.PERSONNEL) {
          this.router.navigate(['/personnel-profile'])
        }
        return response
      })
    )
  }

  submitEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseURL}/auth/forgot-password`, email, this.httpOptions)
  }

  resetPassword(token: string, reset: ResetPassword): Observable<ResetPassword> {
    return this.http.post<ResetPassword>(`${this.baseURL}/auth/reset-password?token=${token}`, reset, this.httpOptions)
  }

  confirmEmail(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.baseURL}/auth/account-verification?token=${token}`)
  }

  logout(): void {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue
  }

  getUserRole(): Role | null {
    return this.currentUserValue?.data.user.role || null
  }
}