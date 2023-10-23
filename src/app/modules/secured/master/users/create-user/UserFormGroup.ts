import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UserFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required])
    });
  }

  get idFormControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get id(): number {
    return this.idFormControl.value;
  }

  get nameFormControl(): FormControl<string> {
    return this.get('name') as FormControl<string>;
  }

  get name(): string {
    return this.nameFormControl.value;
  }

  get usernameFormControl(): FormControl<string> {
    return this.get('username') as FormControl<string>;
  }

  get username(): string {
    return this.usernameFormControl.value;
  }

  get passwordFormControl(): FormControl<string> {
    return this.get('password') as FormControl<string>;
  }

  get password(): string {
    return this.passwordFormControl.value;
  }

  get mobileFormControl(): FormControl<string> {
    return this.get('mobile') as FormControl<string>;
  }

  get mobile(): string {
    return this.mobileFormControl.value;
  }
}
