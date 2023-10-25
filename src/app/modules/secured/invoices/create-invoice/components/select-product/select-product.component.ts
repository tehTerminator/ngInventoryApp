import { Component } from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApiService } from './../../../../../../services/api/api.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent {
  productControl = new FormControl();
  products = [
    {
      id: 1,
      title: 'Product 1',
    },
    {
      id: 2,
      title: 'Product 2',
    },
    {
      id: 3,
      title: 'Product 3',
    },
  ]; // Replace with your product data

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  onSelectProduct() {
    // Get the selected product from the form control
    const selectedProduct = this.productControl.value;

    if (selectedProduct) {
      // Set the selected product in the InvoiceService

      this.navigateToCreateTransactions(selectedProduct);
    }
  }

  loadProducts(): void {
    this.api.
  }

  navigateToCreateTransactions(product_id: number) {
    console.log(product_id)
    // Get the current :type parameter from the route
    const type = this.route.snapshot.paramMap.get('type');

    // Navigate to the relative path for select-product
    this.router.navigate(['../create-transactions'], {
      relativeTo: this.route,
      queryParams: { type, product_id },
    });
  }
}
