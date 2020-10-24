import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/authentication/login/login.component';
import {AuthGuard} from './helpers/auth.guard';
import {NbAuthComponent} from '@nebular/auth';
import {RegisterComponent} from './pages/authentication/register/register.component';
import {RequestPasswordComponent} from './pages/authentication/request-password/request-password.component';
import {ResetPasswordComponent} from './pages/authentication/reset-password/reset-password.component';
import {VerifyAccountComponent} from './pages/authentication/verify-account/verify-account.component';
import {PagesGuard} from './helpers/pages.guard';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    canActivate: [PagesGuard],
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'verify-account',
        component: VerifyAccountComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
