import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../auth/authService/auth.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { environment } from '../../../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  let toast = inject(NgToastService)
  const baseURL = environment.baseUrl

  const tokenRefreshUrl = `${baseURL}/auth/token-refresh`

  if (req.url === tokenRefreshUrl) {
    return next(req)
  }

  const currentUser = authService.currentUserValue?.data.token.accessToken
  const token = currentUser

  if (token) {
    try {
      let decodedToken = jwtDecode(token)
      const isExpired = decodedToken?.exp ? decodedToken.exp < Date.now() / 1000 : false

      if (isExpired) {
        authService.tokenRefresh().subscribe((newToken: any) => {
          const user = localStorage.getItem('currentUser')
          if (user) {
            const storedUser = JSON.parse(user)
            const newUser = {
              ...storedUser,
              data: {
                ...storedUser.data,
                token: {
                  ...storedUser.data.token,
                  accessToken: newToken.data
                }
              }
            }
            authService.storeUserData(newUser)
          }
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          })
          return next(req)
        })

      } else {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        return next(req)
      }

    } catch (e) {
      toast.danger('Invalid authorization token', 'Access denied', 3000)
      authService.logout()
    }
  } else {
    authService.logout()
  }

  return next(req)
}