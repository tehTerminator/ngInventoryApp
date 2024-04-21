import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralItem } from '../../../../../../interface/general-item.interface';

export class TransactionForm extends FormGroup {
  constructor() {
    super({
      item: new FormControl<GeneralItem | null>(null, [Validators.required]),
      quantity: new FormControl(0, Validators.required),
      rate: new FormControl(0, Validators.required),
    });
  }

  get itemFormControl(): FormControl<GeneralItem | null> {
    return this.get('item') as FormControl<GeneralItem | null>;
  }

  get item(): GeneralItem | null {
    return this.itemFormControl.value;
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }
  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
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
