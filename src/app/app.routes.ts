import { Routes } from '@angular/router';
import { AdminDashboardHomeComponent } from './admin/admin-dashboard-home/admin-dashboard-home.component';
import { PersonnelsComponent } from './admin/personnels/personnels.component';
import { PersonnelDetailsComponent } from './admin/personnel-details/personnel-details.component';
import { canActivate, canDeactivate, canMatch } from './guard/auth.guard';
import { Role } from './model/login';
import { EmergencyComponent } from './admin/emergency/emergency.component';
import { EmergencyInitiativeComponent } from './admin/emergency-initiative/emergency-initiative.component';
import { AccountSettingsComponent } from '../app/account-settings/account-settings.component';
import { ProfessionComponent } from './admin/profession/profession.component';
import { ManagerComponent } from './admin/manager/manager.component';
import { PersonnelEmergencyComponent } from './personnel/personnel-emergency/personnel-emergency.component';
import { ProjectsComponent } from './personnel/projects/projects.component';
import { PersonnelHomeComponent } from './personnel/personnel-home/personnel-home.component';
import { EmergencyDetailsComponent } from './admin/emergency-details/emergency-details.component';


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
            { path: 'personnel-details/:id',  component: PersonnelDetailsComponent },
            { path: 'emergency',  component: EmergencyComponent },
            { path: 'professions',  component: ProfessionComponent },
            { path: 'managers',  component: ManagerComponent },
            { path: 'emergency-initiative',  component: EmergencyInitiativeComponent },
            { path: 'account-settings/:name',  component: AccountSettingsComponent },
            { path: 'emergency-initiative-details/:id', component: EmergencyDetailsComponent }
        ]
    },
    {
        path: 'personnel-profile',
        loadComponent: () => import('../app/personnel/personnel-profile/personnel-profile.component')
            .then(c => c.PersonnelProfileComponent),
        title: 'Personnel Disaster Recovery | Personnel Profile Page',
        canActivate: [canActivate],
        canMatch: [canMatch],
        data: { roles: [Role.PERSONNEL] }
    },
    {
        path: 'personnel-dashboard',
        loadComponent: () => import('../app/personnel/personnel-dashboard/personnel-dashboard.component')
            .then(c => c.PersonnelDashboardComponent),
        title: 'Personnel Disaster Recovery | Personnel Dashboard Page',
        canActivate: [canActivate],
        canMatch: [canMatch],
        data: { roles: [Role.PERSONNEL] },
        children: [
            { path: '',  component: PersonnelHomeComponent },
            { path: 'emergency-initiative',  component: PersonnelEmergencyComponent },
            { path: 'projects',  component: ProjectsComponent },
            { path: 'account-settings/:name',  component: AccountSettingsComponent }       
        ]
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
        loadComponent: () => import('../app/page-not-found/page-not-found.component')
            .then(c => c.PageNotFoundComponent)
    }
]