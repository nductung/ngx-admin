import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.authenticationService.getCurrent().subscribe(res => {
      this.user = res.data;
      this.user.picture = this.user.picture ? this.user.picture : environment.picture;
      this.setValueForm();
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      'firstName': [{value: null, disabled: false}, [Validators.required]],
      'lastName': [{value: null, disabled: false}, [Validators.required]],
      'picture': [{value: '', disabled: false}, [Validators.required]],
      'username': [{value: null, disabled: true}, [Validators.required]],
      'email': [{value: null, disabled: true}, [Validators.required]],
      'createdAt': [{value: null, disabled: true}, [Validators.required]],
      'updatedAt': [{value: null, disabled: true}, [Validators.required]],
    });
  }

  setValueForm() {
    this.formGroup.setValue({
      'firstName': this.user.firstName,
      'lastName': this.user.lastName,
      'username': this.user.username,
      'email': this.user.email,
      'picture': this.user.picture,
      'createdAt': this.user.createdAt,
      'updatedAt': this.user.updatedAt,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      console.dir('invalid');
    } else {
      console.dir('ok');
    }
  }

}
