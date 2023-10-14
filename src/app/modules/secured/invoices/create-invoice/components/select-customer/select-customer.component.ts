import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from './../../../services/invoice-store.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent {
  customerForm = new SelectCustomerForm();
  customers = [
    { id: 1, title: 'Customer 1' },
    { id: 2, title: 'Customer 2' },
    { id: 3, title: 'Customer 3' },
    { id: 4, title: 'Customer 4' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: InvoiceStoreService,
  ) {}

  onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }

    this.store.contact = this.customerForm.id;
    this.navigateToSelectProduct();
  }

  navigateToSelectProduct() {
    // Get the current :type parameter from the route
    const type = this.route.snapshot.paramMap.get('type');

    // Navigate to the relative path for select-product
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
      queryParams: { type: type },
    });
  }
}

class SelectCustomerForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0),
    });
  }

  get idField(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get id(): number {
    return this.idField.value || 0;
  }
}
