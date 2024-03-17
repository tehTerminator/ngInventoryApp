import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, map } from 'rxjs';
import { Bundle, BundleTemplate } from './../../../../../interface/bundles';
import { ApiService } from './../../../../../services/api/api.service';
import { ProductService } from './../../../../../services/product/product.service';
import { LedgerService } from './../../../../../services/ledger/ledger.service';

@Injectable()
export class BundleStoreService {
  private _bundle$ = new BehaviorSubject<Bundle>(EMPTY_BUNDLE);
  private _total = 0;

  constructor(
    private api: ApiService,
    private productService: ProductService,
    private ledgerService: LedgerService
  ) {
    productService.init();
    ledgerService.init();
  }

  set id(id: number) {
    this.retrieveBundle(id.toString());
  }

  get bundle$(): BehaviorSubject<Bundle> {
    return this._bundle$;
  }

  get templates$(): Observable<BundleTemplate[]> {
    return this._bundle$.pipe(map((bundle) => bundle.template));
  }

  get totalAmount(): number {
    return this._total;
  }

  private retrieveBundle(id: string) {
    this.api.retrieve<Bundle[]>(['bundle', id.toString()]).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.retrieveTemplates(data[0]);
        } else {
          this._bundle$.next(EMPTY_BUNDLE);
        }
      },
      error: () => this._bundle$.next(EMPTY_BUNDLE),
    });
  }

  private retrieveTemplates(bundle: Bundle) {
    this.api
      .retrieve<BundleTemplate[]>('bundles__templates', {
        bundleId: bundle.id.toString(),
      })
      .subscribe({
        next: (data) => {
          this._total = 0;
          data.forEach(element => {
            if (element.kind === 'PRODUCT') {
              element.title = this.productService.getElementById(element.item_id).title;
            } else {
              element.title = this.ledgerService.getElementById(element.item_id).title;
            }

            this._total += element.rate * element.quantity;
          });
          bundle.template = data;
          this._bundle$.next(bundle);
        },
        error: () => (bundle.template = []),
      });
  }
}

const EMPTY_BUNDLE: Bundle = {
  id: 0,
  title: 'Dummy Bundle',
  rate: 0,
  template: [],
};
