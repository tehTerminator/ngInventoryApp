import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Contact } from './../../../../../../interface/contact.interface';

export class SelectContactForm extends FormGroup {
  constructor() {
    super({
      contact: new FormControl<Contact | null>(null, {validators: [Validators.required, ValidateContact]}),
    });
  }

  get contactField(): FormControl<Contact> {
    return this.get('contact') as FormControl<Contact>;
  }

  get contact(): Contact | null {
    return this.contactField.value;
  }
}

function ValidateContact(control: AbstractControl): ValidationErrors | null {
    console.log('Validating Contact');
    if (control.value === null) {
      return { isNull: true }; // No need for type assertion as ValidationErrors is inferred
    }

    // Option 1: Type assertion (casting) with potential runtime errors
    if (!(control.value as Contact)) {
      return { notContact: true };
    }

    // Option 2: Recommended - Use a type guard function for robust type checking
    if (!isContact(control.value)) {
      return { notContact: true };
    }

    return null;
}

function isContact(value: any): value is Contact {
  return value !== null && (value.hasOwnProperty('title') && (value.hasOwnProperty('mobile')));
}