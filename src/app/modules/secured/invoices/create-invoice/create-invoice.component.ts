import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceStoreService } from './../services/invoice-store.service';
import { Subject, takeUntil } from 'rxjs';
import { MyLocationStoreService } from '../../../../services/myLocation/my-location.service';
import { AuthStoreService } from './../../../../services/auth-store/auth-store.service';

@Component({
    selector: 'app-create-invoice',
    templateUrl: './create-invoice.component.html',
    styleUrls: ['./create-invoice.component.scss'],
    standalone: false
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {
  private _notifier$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: InvoiceStoreService,
    private authStore: AuthStoreService,
    private locationStore: MyLocationStoreService
  ) {}

  ngOnInit(): void {
    this.store.reset();
    this.route.paramMap.pipe(takeUntil(this._notifier$)).subscribe({
      next: (value) => {
        let type = value.get('type') || 'EMPTY';
        type = type.toUpperCase();
        if (type === 'SALES' || type === 'PURCHASE') {
          this.store.setKind(type);
        }
        return;
      },
    });

    this.locationStore.selectedLocation
      .pipe(takeUntil(this._notifier$))
      .subscribe({ next: (value) => (this.store.setLocation(value.id)) });

    this.store.setUser(this.authStore.user().id);
  }

  get color(): string {
    return this.store.kind().toLowerCase();
  }

  ngOnDestroy(): void {
    this._notifier$.next(0);
    this._notifier$.complete();
  }
}
