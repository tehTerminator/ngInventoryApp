import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralItem } from '../../../../../../interface/general-item.interface';
import { evaluateString } from '../../../../../../shared/functions';
import { Product } from '../../../../../../interface/product.interface';

export class TransactionForm extends FormGroup {
  constructor() {
    super({
      item: new FormControl<GeneralItem | Product | null>(null, [
        Validators.required,
      ]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      rate: new FormControl(0, [
        Validators.required,
        Validators.min(0.01),
        Validators.pattern('^\\d+(\\.\\d{1,2})?$'),
      ]),
    });

    this.rateFormControl.valueChanges.subscribe({
      next: (value) => {
        const lastChar = value[value.length - 1];
        if (lastChar === '=') {
          try {
            const result = evaluateString(value);
            this.rateFormControl.setValue(result.toString());
          } catch (e) {
            this.rateFormControl.setValue('0');
          }
        }
      },
    });
  }

  get itemFormControl(): FormControl<GeneralItem | Product | null> {
    return this.get('item') as FormControl<GeneralItem | null>;
  }

  get item(): GeneralItem | Product | null {
    return this.itemFormControl.value;
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }
  get rateFormControl(): FormControl<string> {
    return this.get('rate') as FormControl<string>;
  }

  get quantity(): number {
    return this.quantityFormControl.value;
  }
  get rate(): number {
    return +this.rateFormControl.value;
  }

  get amount(): number {
    return this.quantity * this.rate;
  }
}
