import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TransferProductFormGroup extends FormGroup {
  constructor() {
    super({
      myLocation: new FormControl(0, Validators.required),
      toLocation: new FormControl(0, Validators.required),
      product: new FormControl(0, Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      narration: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }


  get myLocationControl(): FormControl<number> {
    return this.get('myLocation') as FormControl<number>;
  }

  get toLocationControl(): FormControl<number> {
    return this.get('toLocation') as FormControl<number>;
  }

  get productControl(): FormControl<number> {
    return this.get('product') as FormControl<number>;
  }

  get quantityControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }

  get narrationControl(): FormControl<string> {
    return this.get('narration') as FormControl<string>;
  }

  // You can also create getters for the values of the form controls
  get myLocation(): number {
    return this.myLocationControl.value;
  }

  get toLocation(): number {
    return this.toLocationControl.value;
  }

  get product(): number {
    return this.productControl.value;
  }

  get quantity(): number {
    return this.quantityControl.value;
  }

  get narration(): string {
    return this.narrationControl.value;
  }
}
