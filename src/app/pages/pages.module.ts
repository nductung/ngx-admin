import { NgModule } from '@angular/core';
import {
  NbAlertModule, NbAutocompleteModule,
  NbButtonModule, NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {NbAuthModule} from '@nebular/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RequestPasswordComponent } from './authentication/request-password/request-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbAuthModule,
    NbAlertModule,
    FormsModule,
    NbInputModule,
    NbCheckboxModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class PagesModule {
}
