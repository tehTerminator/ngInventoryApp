import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from '../../../services/authentication/user.model';

export class UserForm extends FormGroup {
  constructor(user: User) {
    super({
      name: new FormControl(user.name, {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      mobile: new FormControl(user.mobile, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(''),
        ],
      }),
      oldPassword: new FormControl('', { validators: [Validators.required] }),
      newPassword: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  // Getters and setters for individual form controls
  getName() {
    return this.get('name') as FormControl;
  }

  getMobile() {
    return this.get('mobile') as FormControl;
  }

  getOldPassword() {
    return this.get('oldPassword') as FormControl;
  }

  getNewPassword() {
    return this.get('newPassword') as FormControl;
  }

  getConfirmPassword() {
    return this.get('confirmPassword') as FormControl;
  }
}
