import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS} from '@nebular/auth';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  messages: string[] = [];
  errors: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(
    protected service: AuthenticationService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) {
    if (this.service.currentUserValue) {
      this.router.navigate(['/pages']).then();
    }
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.login(this.user.email, this.user.password).pipe(first()).subscribe(
      res => {
        this.submitted = false;
        this.errors = [];
        this.messages.push(res.message);
        this.router.navigate(['/pages']).then();
      },
      error => {
        this.submitted = false;
        this.messages = [];
        this.errors.push(error);
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
