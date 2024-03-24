import { Validators, FormControl, FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';


export class CreateTransactionFormGroup extends FormGroup {
  constructor() {
    super({
      quantity: new FormControl<number>(0, [Validators.required, Validators.min(0.1)]),
      rate: new FormControl<number>(0, [Validators.required, Validators.min(0.1)]),
      discount: new FormControl<number>(0, [Validators.required, Validators.min(0)])
    }, {validators: discountValidator});
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
  get discount(): number {
    return this.discountFormControl.value;
  }

  get grossAmount(): number {
    return this.quantity * this.rate;
  }

  get netAmount(): number {
    return this.grossAmount - this.discount;
  }

  get discountPercentage(): number {
    const val = (this.discount / this.grossAmount) * 100;
    if (isNaN(val)) {
      return 0;
    }
    return val;
  }
}

function discountValidator(control: AbstractControl): ValidationErrors | null {
  const quantity: number = control.get('quantity')?.value;
  const rate: number = control.get('rate')?.value;
  const discount: number = control.get('discount')?.value;

  const grossAmount = quantity * rate;
  const discountPercentage = (discount / grossAmount ) * 100;

  if ( discountPercentage >= 50 ) {
    return { 'exceedsMaxDiscount': true } as ValidationErrors;
  }
  return null;
};