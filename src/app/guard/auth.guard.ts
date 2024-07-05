import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/authService/auth.service';
import { Router } from '@angular/router';
import { Role } from '../model/login';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const requiredRoles = route.data['roles'] as Array<Role>
  const user = authService.currentUserValue?.data.user

  if (user && requiredRoles.includes(user.role)) {
    return true
  } else {
    router.navigate(['/unauthorized-access'])
    return false
  }
}