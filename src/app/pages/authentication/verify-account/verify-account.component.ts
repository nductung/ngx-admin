import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {getDeepFromObject, NB_AUTH_OPTIONS} from '@nebular/auth';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent {

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
    private toastrService: NbToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.user.email = params['email'];
    });
  }

  verifyAccount(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.verifyAccount(this.user).subscribe((result: any) => {
      this.submitted = false;
      this.errors = [];
      this.messages.push(result.message);
    }, error => {
      this.submitted = false;
      this.messages = [];
      this.errors.push(error);
    });
  }

  requestVerifyAccount() {
    this.service.requestVerifyAccount({email: this.user.email}).subscribe((res) => {
      this.toastrService.primary(res.message, 'Thông báo');
    }, error => {
      this.toastrService.danger(error, 'Thông báo');
      this.router.navigate(['/auth/login']).then();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
