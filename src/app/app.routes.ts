import { Routes } from '@angular/router';
import { AdminDashboardHomeComponent } from './admin/admin-dashboard-home/admin-dashboard-home.component';
import { PersonnelsComponent } from './admin/personnels/personnels.component';
import { PersonnelDetailsComponent } from './admin/personnel-details/personnel-details.component';
import { canActivate, canDeactivate, canMatch } from './guard/auth.guard';
import { Role } from './model/login';


export const routes: Routes = [
    {
        path: 'register',
        title: 'Personnel Disaster Recovery | Register Page',
        loadComponent: () => import('../app/auth/register/register.component')
            .then(c => c.RegisterComponent),
    },
    {
        path: 'login',
        title: 'Personnel Disaster Recovery | Login Page',
        loadComponent: () => import('../app/auth/login/login.component')
            .then(c => c.LoginComponent),
    },
    {
        path: 'forgot-password',
        title: 'Personnel Disaster Recovery | Forgot Password Page',
        loadComponent: () => import('../app/auth/forgot-password/forgot-password.component')
            .then(c => c.ForgotPasswordComponent),
    },
    {
        path: 'reset-password',
        title: 'Personnel Disaster Recovery | Reset Password Page',
        loadComponent: () => import('../app/auth/reset-password/reset-password.component')
            .then(c => c.ResetPasswordComponent),
    },
    {
        path: 'email-confirmation',
        title: 'Personnel Disaster Recovery | Email Confirmation Page',
        loadComponent: () => import('../app/auth/email-confirmation/email-confirmation.component')
            .then(c => c.EmailConfirmationComponent),
    },
    {
        path: 'verify-email',
        title: 'Personnel Disaster Recovery | Verify Email Page',
        loadComponent: () => import('../app/auth/verify-email/verify-email.component')
            .then(c => c.VerifyEmailComponent),
    },
    {
        path: 'reset-email',
        title: 'Personnel Disaster Recovery | Reset Email Page',
        loadComponent: () => import('../app/auth/reset-email/reset-email.component')
            .then(c => c.ResetEmailComponent),
    },
    {
        path: 'admin-page',
        title: 'Personnel Disaster Recovery | Admin Dashboard Page',
        loadComponent: () => import('../app/admin/admin-dashboard/admin-dashboard.component')
            .then(c => c.AdminDashboardComponent),
        canActivate: [canActivate],
        canMatch: [canMatch],
        data: { roles: [Role.ADMIN] },
        children: [
            { path: '',  component: AdminDashboardHomeComponent },
            { path: 'personnels',  component: PersonnelsComponent },
            { path: 'personnel-details',  component: PersonnelDetailsComponent }
        ]
    },
    {
        path: 'personnel-profile',
        loadComponent: () => import('../app/personnel/personnel-profile/personnel-profile.component')
            .then(c => c.PersonnelProfileComponent),
        title: 'Personnel Disaster Recovery | Personnel Profile Page',
        canActivate: [canActivate],
        canMatch: [canMatch],
        // canDeactivate: [canDeactivate],
        data: { roles: [Role.PERSONNEL] }
    },
    {
        path: 'account-settings',
        title: 'Personnel Disaster Recovery | Account Settings Page',
        loadComponent: () => import('../app/account-settings/account-settings.component')
        .then(c => c.AccountSettingsComponent)
    },
    {
        path: '',
        title: 'Personnel Disaster Recovery | Home Page',
        loadComponent: () => import('../app/home/home.component')
            .then(c => c.HomeComponent),
            pathMatch: 'full'
    },
    {
        path: '**',
        title: 'Personnel Disaster Recovery | Page Not Found Page',
        loadComponent: () => import('../app/wildcard-routes/page-not-found/page-not-found.component')
            .then(c => c.PageNotFoundComponent)
    }
]