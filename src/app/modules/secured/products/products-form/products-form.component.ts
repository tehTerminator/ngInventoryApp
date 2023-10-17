import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../interface/product';
import { Location } from './../../../../interface/location';
import { BehaviorSubject, Observable, Subscription, finalize } from 'rxjs';
import { ProductForm } from './ProductForm';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { NotificationsService } from '../../../../services/notification/notification.service';
import { ProductGroup } from '../../../../interface/product-group';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  private _locations = new BehaviorSubject<Location[]>([]);
  private _groups = new BehaviorSubject<ProductGroup[]>([]);
  private _sub = new Subscription();
  private _loading = false;
  form = new ProductForm()

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private notice: NotificationsService
  ) {}

  ngOnInit(): void {
    this._sub = this.route.paramMap.subscribe({
      next: (value) => {
        const id = value.get('id');
        if (!!id) {
          this.populateForm(id);
        }
      },
    });

    this.fetchGroups();
    this.fetchLocations();
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
    return this.api.create<Product>(['product'], product)
    .pipe(finalize(() => this._loading = false));
  }

  private updateProduct(product: Product) {
    return this.api.update<Product>(['product'], product)
    .pipe(finalize(() => this._loading = false));
  }

  private handleResponse(response: Observable<Product>): void {
    response.subscribe({
      next: (value) => {
        let message = `Product ${value.title} Created.`;
        if (this.editMode) {
          message = `Product ${value.title} Updated`;
        }
        this.notice.show(message);
      },
      error: () => {
        this.notice.show('Error Occurred');
      }
    })
  }

  private populateForm(id: string) {
    this._loading = true;
    this.api
      .fetch_data<Product>(['get', 'product', id])
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (value) =>
          this.form.patchValue({
            id: value.id,
            title: value.title,
          }),
      });
  }

  private fetchGroups() {
    this.api.fetch_data<ProductGroup[]>(['get', 'product-groups'])
    .subscribe({
      next: (value) => this._groups.next(value)
    });
  }

  private fetchLocations() {
    this.api.fetch_data<Location[]>(['get', 'locations'])
    .subscribe({
      next: (value) => this._locations.next(value)
    });
  }

  get editMode(): boolean {
    return this.form.idControl.value > 0;
  }

  get loading(): boolean {
    return this._loading;
  }

  get groups(): Observable<ProductGroup[]> {
    return this._groups;
  }

  get locations(): Observable<Location[]> {
    return this._locations;
  }
}


