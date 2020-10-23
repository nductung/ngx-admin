import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  formGroup: FormGroup;
  submitted = false;
  @ViewChild('photoInput') photoInput: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    public datepipe: DatePipe,
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
      'createdAt': this.datepipe.transform(this.user.createdAt, 'MMM d, y, h:mm:ss a'),
      'updatedAt': this.datepipe.transform(this.user.updatedAt, 'MMM d, y, h:mm:ss a'),
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.user.picture = event.target['result'];
        this.formGroup.patchValue({
          picture: event.target['result'],
        });
      };
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.formGroup.invalid) {
      this.authenticationService.changeInformation(this.formGroup.value).subscribe(res => {

        const dataLocalStorage = this.authenticationService.currentUserValue;
        dataLocalStorage.picture = this.formGroup.controls.picture.value;
        localStorage.setItem('currentUser', JSON.stringify(dataLocalStorage));

        this.toastrService.primary(res.message, 'Thông báo');
      });
    }
  }

}
