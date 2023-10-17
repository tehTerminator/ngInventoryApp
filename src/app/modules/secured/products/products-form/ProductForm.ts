import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProductForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0),
      title: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      group_id: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
      quantity: new FormControl(0),
      location_id: new FormControl(0, { validators: [Validators.required, Validators.min(0)] })
    });
  }

  get idControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  set idControl(value: number) {
    this.idControl.setValue(value);
  }

  get titleControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  set titleControl(value: string) {
    this.titleControl.setValue(value);
  }

  get groupIdControl(): FormControl<number> {
    return this.get('group_id') as FormControl<number>;
  }

  set groupIdControl(value: number) {
    this.groupIdControl.setValue(value);
  }

  get quantityControl(): FormControl<number> {
    return this.get('quantity') as FormControl;
  }

  set quantityControl(value: number) {
    this.quantityControl.setValue(value);
  }

  get locationIdControl(): FormControl<number> {
    return this.get('location_id') as FormControl<number>;
  }

  set locationIdControl(value: number) {
    this.locationIdControl.setValue(value);
  }

}
