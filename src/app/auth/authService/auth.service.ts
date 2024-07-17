import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Register } from '../../model/register';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Login, LoginResponse, Role } from '../../model/login';
import { ResetPassword } from '../../model/reset-password';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected baseURL = environment.baseUrl

  private currentUserSubject: BehaviorSubject<LoginResponse | null>
  public currentUser: Observable<LoginResponse | null>

  constructor(private http: HttpClient, private router: Router, private toast: NgToastService) {
    const storedUser = localStorage.getItem('currentUser')
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      storedUser ? JSON.parse(storedUser) : null
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): LoginResponse | null {
    const value = this.currentUserSubject.value
    return value
  }

  private get httpOptions() {
    const accessToken = this.currentUserValue?.data.token.accessToken
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    }
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.currentUserValue?.data.token.refreshToken
    return this.http.get<LoginResponse>(`${this.baseURL}/auth/token-refresh`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`
      })
    }).pipe(
      tap((response: LoginResponse) => {
        this.storeUserData(response)
      })
    )
  }

  private storeUserData(response: LoginResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(response))
    const storedData = this.currentUserSubject.next(response)
    return storedData
  }

  checkEmail(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseURL}/auth/check-email`, { email })
  }

  Register(user: Register): Observable<Register> {
    return this.checkEmail(user.email).pipe(
      switchMap((response) => {
        if (response.message.includes("doesn't exist")) {
          return this.http.post<Register>(`${this.baseURL}/auth/register`, user, this.httpOptions).pipe(
            tap(() => {
              this.router.navigate(['/verify-email'], { state: { email: user.email } })
            })
          )
        } else {
          this.toast.danger('Email already exists, try a different one', 'Error', 3000)
          throw new Error('Email already exists, try a different one')
        }
      })
    )
  }

  Login(user: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}/auth/login`, user, this.httpOptions)
      .pipe(
        map((response: LoginResponse) => {
          this.storeUserData(response)

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

  resendConfirmationEmail(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseURL}/auth/re-send-email`, { email })
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

  // refreshToken(): Observable<{ data: string }> {
  //   const refreshToken = this.currentUserValue?.data.token.refreshToken
  //   return this.http.get<{ data: string }>(`${this.baseURL}/auth/token-refresh`, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${refreshToken}`
  //     })
  //   })
  //   .pipe(
  //     tap((response: { data: string }) => {
  //       const currentUser = this.currentUserValue
  //       console.log('current user after refresh',currentUser)
        
  //       if (currentUser) {
  //         currentUser.data.token.accessToken = response.data
  //         const refresh = this.storeUserData(currentUser)
  //         console.log('token refresh', refresh)
  //       }
  //     })
  //   )
  // }
}