import { Validators, FormControl, FormGroup } from '@angular/forms';


export class CreateTransactionFormGroup extends FormGroup {
  constructor() {
    super({
      quantity: new FormControl<number>(0, [Validators.required, Validators.min(0.1)]),
      rate: new FormControl<number>(0, [Validators.required, Validators.min(0.1)]),
    });
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }
  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }
  get discountFormControl(): FormControl<number> {
    return this.get('discount') as FormControl<number>;
  }

  get quantity(): number {
    return this.quantityFormControl.value;
  }
  get rate(): number {
    return this.rateFormControl.value;
  }

  get grossAmount(): number {
    return this.quantity * this.rate;
  }
}