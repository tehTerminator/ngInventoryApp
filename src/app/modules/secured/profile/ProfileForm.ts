import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProfileForm extends FormGroup {
  constructor() {
    super({
      displayName: new FormControl<string>('', [Validators.required, Validators.min(3), Validators.pattern('^A-Za-z $')]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      dob: new FormControl<string>('', [Validators.required]),
    });
  }

  get displayNameField(): FormControl<string> {
    return this.get('displayName') as FormControl<string>;
  }
  get emailField(): FormControl<string> {
    return this.get('email') as FormControl<string>;
  }
  get dobField(): FormControl<string> {
    return this.get('dob') as FormControl<string>;
  }

  get displayName(): string {
    return this.displayNameField.value;
  }
  get email(): string {
    return this.emailField.value;
  }
  get dob(): string {
    return this.dobField.value;
  }
}
