import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TemplateFormGroup extends FormGroup {
  constructor() {
    super({
      kind: new FormControl<'PRODUCT' | 'LEDGER'>('PRODUCT', [Validators.required]),
      item_id: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
      rate: new FormControl<number>(0, [Validators.required, Validators.min(0.1)]),
      quantity: new FormControl<number>(0, [Validators.required, Validators.min(0.1)])
    });
  }

  get kindFormControl(): FormControl<'PRODUCT' | 'LEDGER'> {
    return this.get('kind') as FormControl<'PRODUCT' | 'LEDGER'>;
  }

  get item_idFormControl(): FormControl<number> {
    return this.get('item_id') as FormControl<number>;
  }

  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }

  get kind(): 'PRODUCT' | 'LEDGER' {
    return this.kindFormControl.value;
  }

  get item_id(): number {
    return this.item_idFormControl.value;
  }

  get rate(): number {
    return this.rateFormControl.value;
  }

  get quantity(): number {
    return this.quantityFormControl.value;
  }
}
