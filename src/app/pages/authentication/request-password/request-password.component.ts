import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent {

  messages: string[] = [];
  errors: string[] = [];
  user: any = {};
  submitted = false;

  constructor(
    protected service: AuthenticationService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) {
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.requestPassword(this.user).subscribe((res) => {
      this.submitted = false;
      this.errors = [];
      this.messages.push(res.message);
      this.router.navigate(['/auth/reset-password'], {queryParams: {email: this.user.email}}).then();
    }, error => {
      this.submitted = false;
      this.messages = [];
      this.errors.push(error);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
