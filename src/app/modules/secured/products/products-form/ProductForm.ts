import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProductForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0),
      title: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)] }),
      quantity: new FormControl<number>(0),
      rate: new FormControl<number>(0, [Validators.required, Validators.min(0.1)]),
      location_id: new FormControl<number>(0, { validators: [Validators.min(0)] })
    });
  }

  get idControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get id(): number {
    return this.idControl.value;
  }

  get titleControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get title(): string {
    return this.titleControl.value;
  }

  get quantityControl(): FormControl<number> {
    return this.get('quantity') as FormControl;
  }

  get quantity(): number {
    return this.quantityControl.value;
  }

  get rateControl(): FormControl<number> {
    return this.get('rate') as FormControl;
  }

  get rate(): number {
    return this.rateControl.value;
  }

  get locationControl(): FormControl<number> {
    return this.get('location_id') as FormControl<number>;
  }

  get location(): number {
    return this.locationControl.value;
  }

}
