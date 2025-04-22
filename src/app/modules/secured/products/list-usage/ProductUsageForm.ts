import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreLocation } from '../../../../interface/location.interface';
import { Product } from '../../../../interface/product.interface';
import { getCurrentDateString, parseDate } from '../../../../shared/functions';

export class ProductUsageForm extends FormGroup {
  constructor() {
    super({
      createdAt: new FormControl<Date>(new Date(), {
        nonNullable: true, validators: [Validators.required]
      }),
      product: new FormControl<Product | null>(null, {
        validators: [Validators.required]
      }),
      location: new FormControl<StoreLocation | null>(null, {
        validators: [Validators.required]
      })
    });
  }

  get createdAtFormControl(): FormControl<Date> {
    return this.get('createdAt') as FormControl<Date>;
  }

  get createdAt(): string {
    return parseDate(this.createdAtFormControl.value);
  }

  get productFormControl(): FormControl<Product | null> {
    return this.get('product') as FormControl<Product | null>;
  }

  get product(): Product | null {
    return this.productFormControl.value;
  }

  get locationFormControl(): FormControl<StoreLocation> {
    return this.get('location') as FormControl<StoreLocation>;
  }

  get location(): StoreLocation {
    return this.locationFormControl.value;
  }

  get formData() {
    const created_at = this.createdAt;
    const product_id = (this.product?.id || 0);
    const location_id = (this.location?.id || 0);

    return { created_at, product_id, location_id };
  }
}
