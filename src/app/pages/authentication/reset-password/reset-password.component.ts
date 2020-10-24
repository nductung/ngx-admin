import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {

  messages: string[] = [];
  errors: string[] = [];
  user: any = {};
  submitted = false;

  constructor(
    protected service: AuthenticationService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    protected router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      this.user.email = params['email'];
    });
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.user).subscribe((res) => {
      this.submitted = false;
      this.errors = [];
      this.messages.push(res.message);
      this.router.navigate(['/auth/login']).then();
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
