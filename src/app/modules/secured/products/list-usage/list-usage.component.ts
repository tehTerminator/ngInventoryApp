import { Component, OnInit } from '@angular/core';
import { Product } from './../../../../interface/product.interface';
import { StoreLocation } from './../../../../interface/location.interface';
import { ApiService } from './../../../../services/api/api.service';
import { NotificationsService } from './../../../../services/notification/notification.service';
import { LocationService } from '../../../../services/locations/locations.service';
import { ProductService } from '../../../../services/product/product.service';
import { Observable } from 'rxjs';
import { ProductUsageForm } from './ProductUsageForm';
import { ProductUsageItem } from './ProductUsageItem';

@Component({
  selector: 'app-list-usage',
  standalone: false,
  templateUrl: './list-usage.component.html',
  styleUrl: './list-usage.component.scss',
})
export class ListUsageComponent implements OnInit {
  productUsageForm = new ProductUsageForm();
  productUsageData: ProductUsageItem[] = [];

  constructor(
    private api: ApiService,
    private notice: NotificationsService,
    private locationService: LocationService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.locationService.init();
    this.productService.init();
  }

  onSubmit() {
    if (this.productUsageForm.invalid) {
      this.notice.show('Invalid Form Data');
      return;
    }

    const productFormData = this.productUsageForm.formData;
    const payload = {
      created_at: productFormData.created_at,
      product_id: productFormData.product_id.toString(),
      location_id: productFormData.location_id.toString(),
    };

    this.api
      .retrieve<ProductUsageItem[]>(['product', 'transferHistory'], payload)
      .subscribe({
        next: (value) => (this.productUsageData = value),
        error: (err) => {
          this.productUsageData = [];
          this.notice.show('Error, Please Check Log');
        },
      });
  }

  get products(): Observable<Product[]> {
    return this.productService.getAsObservable();
  }

  get locations(): Observable<StoreLocation[]> {
    return this.locationService.getAsObservable();
  }
}
