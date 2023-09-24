import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { EMPTY, Observable, Subscription, finalize } from 'rxjs';
import { AuthStoreService } from '../../services/auth-store/auth-store.service';
import { AuthState } from '../../interface/auth-state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authSubscription: Subscription = new Subscription()
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.init();
    this.authSubscription = this.authStore.state.subscribe({
      next: (value: AuthState) => {
        switch (value) {
          case AuthState.STARTED:
            this.isLoading = true;
            break;
          case AuthState.LOGGED_IN:
            this.navigateToAuthenticatedPage();
            break;
          default:
            this.isLoading = false;
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSubmit(): void {
    const username = this.usernameField.value;
    const password = this.passwordField.value;

    if (this.loginForm.invalid) {
      this.notification.show('Please Enter Username and Password');
      return;
    }

    this.isLoading = true;

    this.authService
      .authenticate(username, password)
      .subscribe({
        next: () => this.navigateToAuthenticatedPage(),
        error: (error: string) => this.notification.show(error),
      });
  }

  private navigateToAuthenticatedPage = () => this.router.navigate(['auth']);

  get usernameField(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordField(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}

interface LoginCredentials {
  username: FormControl<string>;
  password: FormControl<string>;
}
