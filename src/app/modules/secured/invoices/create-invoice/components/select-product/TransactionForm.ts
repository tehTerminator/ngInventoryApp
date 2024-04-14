import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../../../interface/product.interface';

export class TransactionForm extends FormGroup {
  constructor() {
    super({
      product: new FormControl<Product | null>(null, [Validators.required]),
      quantity: new FormControl(0, Validators.required),
      rate: new FormControl(0, Validators.required),
    });
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }
  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }

  get productFC(): FormControl<Product> {
    return this.get('product') as FormControl<Product>;
  }

  get product(): Product {
    return this.productFC.value;
  }

  get quantity(): number {
    return this.quantityFormControl.value;
  }
  get rate(): number {
    return this.rateFormControl.value;
  }

  get amount(): number {
    return this.quantity * this.rate;
  }
}
