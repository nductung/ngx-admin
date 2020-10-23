import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authenticationService: AuthenticationService,
    protected router: Router,
  ) {
    this.authenticationService.getCurrent().subscribe(res => {
      this.user = res.data;
      this.user.avatar = this.user.avatar ? this.user.avatar : environment.avatar;
    });
  }

  ngOnInit(): void {
  }

}
