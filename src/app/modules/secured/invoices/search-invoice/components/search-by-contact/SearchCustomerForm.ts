import {
  Validators, FormGroup,
  FormControl
} from '@angular/forms';
import { Contact } from '../../../../../../interface/contact.interface';

export class SearchCustomerForm extends FormGroup {
  constructor() {
    super({
      contact: new FormControl('', Validators.required),
      month: new FormControl(null, Validators.required),
      paymentStatus: new FormControl(0, Validators.required),
    });
  }

  get contact(): Contact {
    return this.contactFormControl.value;
  }

  get month(): string {
    return this.monthFormControl.value;
  }

  get paymentStatus(): boolean {
    return this.paymentStatusFormControl.value;
  }

  get contactFormControl(): FormControl<Contact> {
    return this.get('contact') as FormControl<Contact>;
  }

  get monthFormControl(): FormControl<string> {
    return this.get('month') as FormControl<string>;
  }

  get paymentStatusFormControl(): FormControl<boolean> {
    return this.get('paymentStatus') as FormControl<boolean>;
  }
}
