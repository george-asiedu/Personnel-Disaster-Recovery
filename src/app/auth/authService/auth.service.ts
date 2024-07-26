import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Register } from '../../model/register';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
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

  public storeUserData(response: LoginResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(response))
    const storedData = this.currentUserSubject.next(response)
    return storedData
  }

  checkEmail(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseURL}/auth/check-email`, {email})
  }

  Register(user: Register): Observable<Register> {
    return this.checkEmail(user.email).pipe(
      switchMap((response) => {
        if (response.message.includes("doesn't exist")) {
          return this.http.post<Register>(`${this.baseURL}/auth/register`, user).pipe(
            tap(() => {
              this.router.navigateByUrl('/verify-email', { state: { email: user.email } })
            })
          )
        } else {
          this.toast.danger(response.message, 'Error', 3000)
          return throwError(() => new Error(response.message))
        }
      }),
      catchError((error) => {
        this.toast.danger(error.error.message, 'Error', 3000)
        return throwError(() => new Error(error))
      })
    )
  }

  Login(user: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}/auth/login`, user)
      .pipe(
        map((response: LoginResponse) => {
          this.storeUserData(response)

          if (response.data.user.role === Role.ADMIN) {
            this.router.navigate(['/admin-page'])
          } else if (response.data.user.role === Role.PERSONNEL) {
            if (response.data.user.hasPersonnelData) {
              this.router.navigateByUrl('/personnel-dashboard')
            } else {
              this.router.navigateByUrl('/personnel-profile')
            }
          }

          return response
        }),
        tap(() => {})
      )
  }

  submitEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseURL}/auth/forgot-password`, email)
  }

  resetPassword(token: string, reset: ResetPassword): Observable<ResetPassword> {
    return this.http.post<ResetPassword>(`${this.baseURL}/auth/reset-password?token=${token}`, reset)
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
    this.router.navigateByUrl('/login')
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue
  }

  getUserRole(): Role | null {
    return this.currentUserValue?.data.user.role || null
  }
  
  tokenRefresh(): Observable<any> {
    const refreshToken = this.currentUserValue?.data.token.refreshToken
    const headers = new HttpHeaders({
        Authorization: `Bearer ${refreshToken}`
    })
    return this.http.get<any>(`${this.baseURL}/auth/token-refresh`, {headers})
      .pipe(
        catchError((error) => {
          this.toast.danger('Error refreshing token', 'Error', 3000)
          this.logout()
          return throwError(() => error)
        })
      )
  }
}