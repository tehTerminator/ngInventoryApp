import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { StoreLocation } from './../../../../interface/location.interface';
import { BehaviorSubject, Observable, Subscription, finalize } from 'rxjs';
import { ProductForm } from './ProductForm';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../../services/notification/notification.service';
import { ProductService } from '../../../../services/product/product.service';
import { LocationService } from './../../../../services/locations/locations.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  private _sub = new Subscription();
  private _loading = false;
  form = new ProductForm();

  constructor(
    private route: ActivatedRoute,
    private notice: NotificationsService,
    private productService: ProductService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this._sub = this.route.paramMap.subscribe({
      next: (value) => {
        const id = value.get('id');
        if (!!id) {
          this.populateForm(+id);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this._loading = true;

    if (this.editMode) {
      this.handleResponse(this.updateProduct(this.form.value));
      return;
    }

    this.handleResponse(this.addNewProduct(this.form.value));
  }

  private addNewProduct(product: Product) {
    return this.productService.create(product)
      .pipe(finalize(() => (this._loading = false)));
  }

  private updateProduct(product: Product) {
    return this.productService.update(product)
      .pipe(finalize(() => (this._loading = false)));
  }

  private handleResponse(response: Observable<Product>): void {
    response.subscribe({
      next: (value) => {
        let message = `Product ${value.title} Created.`;
        if (this.editMode) {
          message = `Product ${value.title} Updated`;
        }
        this.notice.show(message);
        this.form.reset();
      },
      error: () => {
        this.notice.show('Error Occurred');
      },
    });
  }

  private populateForm(id: number) {
    this._loading = true;
    const product = this.productService.getElementById(id)
    this.form.patchValue({
      title: product.title,
      rate: product.rate,
    })
  }

  get editMode(): boolean {
    return this.form.idControl.value > 0;
  }

  get loading(): boolean {
    return this._loading;
  }

  get locations(): Observable<StoreLocation[]> {
    return this.locationService.getAsObservable();
  }
}
