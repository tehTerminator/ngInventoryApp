import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransferProductFormGroup } from './TransferProductFormGroup';
import { LocationService } from './../../../../services/locations/locations.service';
import { ApiService } from '../../../../services/api/api.service';
import { BehaviorSubject, Observable, Subscription, finalize, map } from 'rxjs';
import { StoreLocation } from '../../../../interface/location.interface';
import { NotificationsService } from '../../../../services/notification/notification.service';
import { StockInfo } from '../../../../interface/stock-info.interface';
import { MyLocationStoreService } from '../../../../services/myLocation/my-location.service';

@Component({
  selector: 'app-transfer-product',
  templateUrl: './transfer-product.component.html',
  styleUrls: ['./transfer-product.component.scss'],
})
export class TransferProductComponent implements OnInit, OnDestroy {
  private _loading = false;
  private _products = new BehaviorSubject<StockInfo[]>([]);
  private _sub = new Subscription();

  form = new TransferProductFormGroup();

  constructor(
    private locationStore: LocationService,
    private api: ApiService,
    private notification: NotificationsService,
    private myLocationStore: MyLocationStoreService
  ) {}

  ngOnInit(): void {
    this.myLocationStore.retrieveData();
    this.locationStore.init();
    this._sub = this.form.myLocationControl.valueChanges
      .pipe(map((value) => value.toString()))
      .subscribe({
        next: (value) => {
          this.loadProducts(value);
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

    if (this.form.myLocation === this.form.toLocation) {
      this.notification.show('Both Locations are same');
      return;
    }

    this._loading = true;

    this.api
      .create(['product', 'transfer'], this.form.value)
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (value) => {
          this.notification.show('Transfer Success');
          this.form.reset();
        },
        error: () => {
          this.notification.show('Unable to Tranfer');
        },
      });
  }

  private loadProducts(id: string): void {
    this._loading = true;
    this.api
      .retrieve<StockInfo[]>(['location', 'inventory'], { id })
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (value) => this._products.next(value),
        error: () => {
          this.notification.show('Unable to Load Products');
          this._products.next([]);
        },
      });
  }

  get loading(): boolean {
    return this._loading;
  }

  get locations(): Observable<StoreLocation[]> {
    return this.locationStore.getAsObservable();
  }

  get myLocations(): Observable<StoreLocation[]> {
    return this.myLocationStore.myLocations;
  }

  get products(): Observable<StockInfo[]> {
    return this._products;
  }
}

