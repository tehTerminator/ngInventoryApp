import { Component, OnInit } from '@angular/core';

import { AuthStoreService } from './../../../services/auth-store/auth-store.service';
import { ApiService } from './../../../services/api/api.service';
import { NotificationsService } from './../../../services/notification/notification.service';
import { UserForm } from './user.form';
import { AnonymousUser, User, UserData } from '../../../services/authentication/user.model';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  userForm = new UserForm(new User(AnonymousUser));

  constructor(
    private authStore: AuthStoreService,
    private authService: AuthenticationService,
    private api: ApiService,
    private notice: NotificationsService, 
  ) {}

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.notice.show('Invalid Form Data');
      return;
    }

    if (!this.userForm.validatePassword()) {
      this.notice.show('Confirm Password Mismatch');
      return;
    }

    this.api.update<UserData>('user', {
      username: this.authStore.user().username,
      name: this.userForm.nameFC.value,
      mobile: this.userForm.mobileFC.value,
      oldPassword: this.userForm.oldPasswordFC.value,
      newPassword: this.userForm.newPasswordFC.value
    })
    .subscribe({
      next: (value => {
        this.userForm.nameFC.setValue(value.name);
        this.userForm.mobileFC.setValue(value.mobile);
        this.authStore.signOut();
        this.notice.show('Successfully Updated User, Sign In Again');
      }),
      error: (err => {
        this.notice.show('Unable to Update Profile');
      })
    })

  }

  ngOnInit(): void {
    this.userForm.patchValue({
      name: this.authStore.user().name,
      mobile: this.authStore.user().mobile
    });
  }

}
