import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from './../../../../../../interface/contact.interface';

export class SelectContactForm extends FormGroup {
  constructor() {
    super({
      contact: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  get contactField(): FormControl<Contact> {
    return this.get('contact') as FormControl<Contact>;
  }

  get contact(): Contact | null {
    return this.contactField.value;
  }
}
