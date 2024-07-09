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
  }
}

const handleUnauthorizedAccess = (router: Router, toast: NgToastService) => {
  toast.warning("You don't have permission", "Access denied", 3000)
  setTimeout(() => {
    router.navigate(['/login'])
  }, 3000)
}

export const canActivate: CanActivateFn = (route) => {
  const { authService, router, toast } = getDependencies()
  const requiredRoles = route.data?.['roles'] as Array<Role> | undefined
  const user = authService.currentUserValue?.data.user

  if (user && requiredRoles && requiredRoles.includes(user.role)) {
    return true
  } else {
    handleUnauthorizedAccess(router, toast)
    return false
  }
};

export const canMatch: CanMatchFn = (route) => {
  const { authService, router, toast } = getDependencies()
  const requiredRoles = route.data?.['roles'] as Array<Role> | undefined
  const user = authService.currentUserValue?.data.user

  if (user && requiredRoles && requiredRoles.includes(user.role)) {
    return true
  } else {
    handleUnauthorizedAccess(router, toast)
    return false
  }
};

export const canDeactivate: CanDeactivateFn<ProfileFormComponent> = ( component: ProfileFormComponent ) => {
  const { toast } = getDependencies()
  if(component.hasUnsavedChanges()) {
    toast.warning("You have unsaved changes", "Warning", 3000)
    return false
  }
  return true
}