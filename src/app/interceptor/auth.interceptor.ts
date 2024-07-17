import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../auth/authService/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService)
  let isRefreshing = false
  const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  const addToken = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    if (!isRefreshing) {
      isRefreshing = true
      refreshTokenSubject.next(null)

      return authService.refreshToken().pipe(
        switchMap((response) => {
          isRefreshing = false
          refreshTokenSubject.next(response.data.token.accessToken)
          return next(addToken(request, response.data.token.accessToken))
        }),
        catchError((err) => {
          isRefreshing = false
          authService.logout()
          return throwError(() => err)
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next(addToken(request, token))
        })
      )
    }
  }

  const accessToken = authService.currentUserValue?.data.token.accessToken;
  if (accessToken) {
    req = addToken(req, accessToken)
  }

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next)
      } else {
        return throwError(() => error)
      }
    })
  )
}