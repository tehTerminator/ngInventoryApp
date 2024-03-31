import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceStoreService } from './../services/invoice-store.service';
import { Subject, takeUntil } from 'rxjs';
import { MyLocationStoreService } from '../../../../services/myLocation/my-location.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {
  private _notifier$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: InvoiceStoreService,
    private locationStore: MyLocationStoreService
  ) {}

  ngOnInit(): void {
    this.store.reset();
    this.route.paramMap.pipe(takeUntil(this._notifier$)).subscribe({
      next: (value) => {
        let type = value.get('type') || 'EMPTY';
        type = type.toUpperCase();
        if (type === 'SALES' || type === 'PURCHASE') {
          this.store.kind = type;
        }
        return;
      },
    });

    this.locationStore.selectedLocation
      .pipe(takeUntil(this._notifier$))
      .subscribe({ next: (value) => (this.store.location = value.id) });
  }

  get color(): string {
    return this.store.kind.toLowerCase();
  }

  ngOnDestroy(): void {
    this._notifier$.next(null);
    this._notifier$.complete();
  }
}
