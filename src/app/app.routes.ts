import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDashboardHomeComponent } from './admin/admin-dashboard-home/admin-dashboard-home.component';
import { PersonnelsComponent } from './admin/personnels/personnels.component';
import { PersonnelDetailsComponent } from './admin/personnel-details/personnel-details.component';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { PersonnelProfileComponent } from './personnel/personnel-profile/personnel-profile.component';
import { ResetEmailComponent } from './auth/reset-email/reset-email.component';
import { authGuard } from './guard/auth.guard';
import { Role } from './model/login';
import { PageNotFoundComponent } from './wildcard-routes/page-not-found/page-not-found.component';
import { UnauthorizedAccessComponent } from './wildcard-routes/unauthorized-access/unauthorized-access.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {
        path: 'register',
        title: 'Personnel Disaster Recovery | Register Page',
        component: RegisterComponent
    },
    {
        path: 'login',
        title: 'Personnel Disaster Recovery | Login Page',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        title: 'Personnel Disaster Recovery | Forgot Password Page',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        title: 'Personnel Disaster Recovery | Reset Password Page',
        component: ResetPasswordComponent
    },
    {
        path: 'email-confirmation',
        title: 'Personnel Disaster Recovery | Email Confirmation Page',
        component: EmailConfirmationComponent
    },
    {
        path: 'verify-email',
        title: 'Personnel Disaster Recovery | Verify Email Page',
        component: VerifyEmailComponent
    },
    {
        path: 'reset-email',
        title: 'Personnel Disaster Recovery | Reset Email Page',
        component: ResetEmailComponent
    },
    {
        path: 'admin-page',
        title: 'Personnel Disaster Recovery | Admin Dashboard Page',
        component: AdminDashboardComponent,
        canActivate: [authGuard],
        data: { roles: [Role.ADMIN] },
        children: [
            { path: '',  component: AdminDashboardHomeComponent },
            { path: 'personnels',  component: PersonnelsComponent },
            { path: 'personnel-details',  component: PersonnelDetailsComponent }
        ]
    },
    {
        path: 'personnel-profile',
        component: PersonnelProfileComponent,
        title: 'Personnel Disaster Recovery | Personnel Profile Page',
        canActivate: [authGuard],
        data: { roles: [Role.PERSONNEL] }
    },
    {
        path: 'unauthorized-access',
        component: UnauthorizedAccessComponent,
        title: 'Personnel Disaster Recovery | Unauthorized Access Page',
        // canActivate: [authGuard],
        // data: { roles: [Role.PERSONNEL] }
    },
    {
        path: '',
        title: 'Personnel Disaster Recovery | Home Page',
        component: HomeComponent
    },
    {
        path: '**',
        title: 'Personnel Disaster Recovery | Page Not Found Page',
        component: PageNotFoundComponent
    }
]