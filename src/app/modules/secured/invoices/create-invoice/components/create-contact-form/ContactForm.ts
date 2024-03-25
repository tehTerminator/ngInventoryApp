import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ContactForm extends FormGroup {
  constructor() {
    super({
      title: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      address: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      mobile: new FormControl<string>('', {
        validators: [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')],
      }),
      kind: new FormControl<'CUSTOMER'|'SUPPLIER'>('CUSTOMER', [Validators.required]),
      ledger: new FormControl<number>(0, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  get titleFormControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get title(): string {
    return this.titleFormControl.value;
  }

  get addressFormControl(): FormControl<string> {
    return this.get('address') as FormControl<string>;
  }

  get address(): string {
    return this.addressFormControl.value;
  }

  get mobileFormControl(): FormControl<string> {
    return this.get('mobile') as FormControl<string>;
  }

  get mobile(): string {
    return this.mobileFormControl.value;
  }

  get ledgerFormControl(): FormControl<number> {
    return this.get('ledger') as FormControl<number>;
  }

  get ledger(): number {
    return this.ledgerFormControl.value;
  }

  set kind(value: 'CUSTOMER' | 'SUPPLIER') {
    this.patchValue({ kind: value });
  }
}
