import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS, NbAuthSocialLink} from '@nebular/auth';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(
    protected service: AuthenticationService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) {
    // redirect to home if already logged in
    if (this.service.currentUserValue) {
      this.router.navigate(['/pages']).then();
    }

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.login(this.user.email, this.user.password).pipe(first()).subscribe(
      res => {
        this.router.navigate(['/pages']).then();
        this.submitted = false;
      },
      error => {
        this.submitted = false;
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
