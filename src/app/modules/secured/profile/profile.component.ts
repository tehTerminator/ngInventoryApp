import { Component } from '@angular/core';

import { AuthStoreService } from './../../../services/auth-store/auth-store.service';
import { UserForm } from './user.form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userForm = new UserForm(this.authStore.userData);

  constructor(private authStore: AuthStoreService ) {}

  onSubmit(): void {

  }

}
