import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TransactionForm extends FormGroup {
  constructor() {
    super({
      quantity: new FormControl(0, Validators.required),
      rate: new FormControl(0, Validators.required),
      gst: new FormControl(0, Validators.required),
      amount: new FormControl(0, Validators.required),
      product_id: new FormControl(0, Validators.required)
    });
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }
  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }
  get gstFormControl(): FormControl<number> {
    return this.get('gst') as FormControl<number>;
  }
  get amountFormControl(): FormControl<number> {
    return this.get('amount') as FormControl<number>;
  }

  get productIdFormControl(): FormControl<number> {
    return this.get('product_id') as FormControl<number>;
  }

  get productId(): number {
    return this.productIdFormControl.value;
  }

  get quantity(): number {
    return this.quantityFormControl.value;
  }
  get rate(): number {
    return this.rateFormControl.value;
  }
  get gst(): number {
    return this.gstFormControl.value;
  }
  get amount(): number {
    return this.amountFormControl.value;
  }
}
