import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../auth/authService/auth.service';
import { Router } from '@angular/router';
import { Role } from '../model/login';
import { NgToastService } from 'ng-angular-popup';
import { ProfileFormComponent } from '../personnel/profile-form/profile-form.component';

const getDependencies = () => {
  return {
    authService: inject(AuthService),
    router: inject(Router),
    toast: inject(NgToastService)
  };
}

const handleUnauthorizedAccess = (router: Router, toast: NgToastService) => {
  toast.warning("Unauthorized route access, please login", "Access denied", 3000)
  router.navigateByUrl('/login')
}

export const canActivate: CanActivateFn = (route) => {
  return checkAuth(route)
}

export const canMatch: CanMatchFn = (route) => {
  return checkAuth(route)
}

export const canDeactivate: CanDeactivateFn<ProfileFormComponent> = ( component: ProfileFormComponent ) => {
  const { toast } = getDependencies()
  if (component.hasUnsavedChanges()) {
    toast.warning("You have unsaved changes", "Warning", 3000)
    return false
  }
  return true
}

export const checkAuth = (route: any) => {
  const { authService, router, toast } = getDependencies()
  const requiredRoles = route.data?.['roles'] as Array<Role> | undefined
  const user = authService.currentUserValue?.data.user

  if (user && requiredRoles && requiredRoles.includes(user.role)) {
    return true
  } else {
    handleUnauthorizedAccess(router, toast)
    return false
  }
}