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
          Validators.pattern('^[6-9][0-9]{9}$'),
        ],
      }),
      oldPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(8)] }),
      newPassword: new FormControl('', [Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.minLength(8)]),
    });
  }

  // Getters and setters for individual form controls
  get nameFC() {
    return this.get('name') as FormControl<string>;
  }

  get mobileFC() {
    return this.get('mobile') as FormControl<string>;
  }

  get oldPasswordFC() {
    return this.get('oldPassword') as FormControl<string>;
  }

  get newPasswordFC() {
    return this.get('newPassword') as FormControl<string>;
  }

  get confirmPasswordFC() {
    return this.get('confirmPassword') as FormControl<string>;
  }

  validatePassword() {
    return this.newPasswordFC.value === this.confirmPasswordFC.value;
  }
}
