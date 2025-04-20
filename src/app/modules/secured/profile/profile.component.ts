import { Component, OnInit } from '@angular/core';

import { AuthStoreService } from './../../../services/auth-store/auth-store.service';
import { UserForm } from './user.form';
import { AnonymousUser, User } from '../../../services/authentication/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  userForm = new UserForm(new User(AnonymousUser));

  constructor(private authStore: AuthStoreService ) {}

  onSubmit(): void {

  }

  ngOnInit(): void {
    this.userForm.patchValue({
      name: this.authStore.user().name,
      mobile: this.authStore.user().mobile
    });
  }

}
