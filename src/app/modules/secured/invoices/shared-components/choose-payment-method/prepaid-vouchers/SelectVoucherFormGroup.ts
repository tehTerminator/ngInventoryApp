import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SelectVoucherFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      amount: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }

  get idFormControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get id(): number {
    return this.idFormControl.value;
  }

  get amountFormControl(): FormControl<number> {
    return this.get('amount') as FormControl<number>;
  }

  get amount(): number {
    return this.amountFormControl.value;
  }

  set amount(value: number) {
    this.amountFormControl.setValue(value);
  }

  /**
   * Sets Validator.min(value) for Amount Field
   */
  set min(value: number) {
    if (value <= 0) {
      return;
    }
    this.amountFormControl.setValidators(Validators.min(value));
    this.updateValueAndValidity();
  }

  set max(value: number) {
    if (value <= 0) {
      return;
    }
    this.amountFormControl.setValidators(Validators.max(value));
    this.updateValueAndValidity();
  }
}
