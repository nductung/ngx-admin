import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {NbAuthModule} from "@nebular/auth";
import {FormsModule} from "@angular/forms";

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
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class PagesModule {
}
