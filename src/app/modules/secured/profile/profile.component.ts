import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../../../services/auth-store/auth-store.service';
import { User } from '../../../services/authentication/user.model';
import { ProfileForm } from './ProfileForm';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm = new ProfileForm();
  constructor(private userStore: AuthStoreService) {}

  ngOnInit(): void {
  
  }

  get user(): User {
    return this.userStore.user;
  }

}

