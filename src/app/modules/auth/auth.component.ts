import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notification/notification.service';
import { AuthStoreService } from '../../services/auth-store/auth-store.service';
import { AuthState } from '../../interface/auth-state';

interface LoginCredentials {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: false
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup<LoginCredentials> = new FormGroup({
    username: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });

  constructor(
    private notification: NotificationsService,
    private authService: AuthenticationService,
    private authStore: AuthStoreService,
  ) {}

  ngOnInit(): void {
    this.authService.init();
  }

  onSubmit(): void {
    const username = this.usernameField.value;
    const password = this.passwordField.value;

    if (this.loginForm.invalid) {
      this.notification.show('Please Enter Username and Password');
      return;
    }

    this.authService
      .authenticate(username, password)
      .subscribe({
        next: (userData) => {this.notification.show("Welcome " + userData.name)},
        error: (error: string) => this.notification.show(error),
      });
  }

  get usernameField(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordField(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get loading(): boolean {
    return this.authStore.state() === AuthState.STARTED;
  }
}

