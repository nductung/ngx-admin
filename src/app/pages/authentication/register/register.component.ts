import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  messages: string[] = [];
  errors: string[] = [];
  user: any = {};
  submitted: boolean = false;
  terms: boolean = false;

  constructor(
    protected service: AuthenticationService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) {
  }

  register(): void {
    this.errors = this.messages = [];
    if (this.terms) {
      this.submitted = true;
      this.service.register(this.user).subscribe((res) => {
        this.submitted = false;
        this.errors = [];
        this.messages.push(res.message);
        this.router.navigate(['/auth/verify-account'], {queryParams: {email: this.user.email}}).then();
      }, error => {
        this.submitted = false;
        this.messages = [];
        this.errors.push(error);
      });
    } else {
      this.messages = [];
      this.errors.push('Please agree to our Terms & Conditions');
    }
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
