import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mobilePattern } from './create-contact-form.component';

export class ContactForm extends FormGroup {
  constructor() {
    super({
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      address: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      mobile: new FormControl('', {
        validators: [Validators.required, Validators.pattern(mobilePattern)],
      }),
      kind: new FormControl('CUSTOMER'),
    });
  }

  get titleFormControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get addressFormControl(): FormControl<string> {
    return this.get('address') as FormControl<string>;
  }

  get mobileFormControl(): FormControl<string> {
    return this.get('mobile') as FormControl<string>;
  }

  set kind(value: string) {
    this.patchValue({ kind: value });
  }
}
