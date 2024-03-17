import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, map } from 'rxjs';
import { Bundle, BundleTemplate } from './../../../../../interface/bundles';
import { ApiService } from './../../../../../services/api/api.service';
import { ProductService } from './../../../../../services/product/product.service';
import { LedgerService } from './../../../../../services/ledger/ledger.service';
import { NotificationsService } from '../../../../../services/notification/notification.service';

@Injectable()
export class BundleStoreService {
  private _bundle$ = new BehaviorSubject<Bundle>(EMPTY_BUNDLE);
  private _total = 0;
  private _id = 0;

  constructor(
    private api: ApiService,
    private productService: ProductService,
    private ledgerService: LedgerService,
    private notification: NotificationsService
  ) {
    productService.init();
    ledgerService.init();
  }

  addTemplate(template: BundleTemplate) {
    const data = this._bundle$.value;
    data.template = [...data.template, template];
    this._bundle$.next(data);
  }

  deleteTemplate(index: number, id: number) {
    this.api.delete('bundles__template', id)
    .subscribe({
      next: (() => {
        const data = this._bundle$.value;
        data.template.splice(index, 1);
        this._bundle$.next(data);
      }),
      error: ((err) => {
        console.error(err);
        this.notification.show('Unable to Delete Template')
      })
    });
  }

  set id(id: number) {
    this._id = id;
    this.retrieveBundle(id.toString());
  }

  get id(): number {
    return this._id;
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
