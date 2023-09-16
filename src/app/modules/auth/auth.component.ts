import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginForm: FormGroup<LoginCredentials> = new FormGroup({
    username: new FormControl<string>('', {validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  }),
    password: new FormControl<string>('', {validators: [
      Validators.required,
      Validators.minLength(8)
    ],
    nonNullable: true
  })
  });


  onSubmit(): void {
    const username = this.usernameField.value;
    const password = this.passwordField.value;

    this.authService.authenticate(username, password)
    .subscribe(
      () => {
        this.router.navigate(['auth']);
      },
      (error) => {
        this.notification.show(error);
      }
    )
  }

  get usernameField(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordField(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(
    private notification: NotificationsService,
    private authService: AuthenticationService, 
    private router: Router) {}

}

interface LoginCredentials {
  username: FormControl<string>;
  password: FormControl<string>;
}

