import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from './../../../../../../services/api/api.service';
import { LedgerService } from './../../../../../../services/ledger/ledger.service';
import { ProductService } from './../../../../../../services/product/product.service';
import { TemplateFormGroup } from './TemplateFormGroup';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { BundleTemplate } from './../../../../../../interface/bundle.interface';
import { BundleStoreService } from '../../services/bundle-store.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent implements OnInit, OnDestroy {
  loading = false;
  constructor(
    private api: ApiService,
    private store: BundleStoreService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private notification: NotificationsService
  ) {}

  templateFormGroup = new TemplateFormGroup();
  isProduct = true;
  private notifier = new Subject();

  ngOnInit(): void {
    this.templateFormGroup.kindFormControl.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        switch (value) {
          case 'PRODUCT':
            this.isProduct = true;
            break;
          default:
            this.isProduct = false;
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.notifier.next(0);
    this.notifier.complete();
  }

  onSubmit() {
    if (this.templateFormGroup.invalid) {
      this.notification.show('Invalid Form Data');
      return;
    }

    this.loading = true;

    

    this.api
      .create<BundleTemplate>(
        ['bundle', this.store.id.toString(), 'template'],
        this.templateFormGroup.value
      ).pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.handleSuccess(data),
        error: () => this.notification.show('Unable to Create Template'),
      });
  }

  private handleSuccess(data: BundleTemplate) {
    const template: BundleTemplate = this.templateFormGroup.value;
    template.id = data.id;
    template.bundle_id = data.bundle_id;
    
    if (this.isProduct) {
      template.title = this.productService.getElementById(template.item_id).title;
    } else {
      template.title = this.ledgerService.getElementById(template.item_id).title;
    }

    this.store.addTemplate(template);
    this.templateFormGroup.reset();
    this.notification.show('Template Added Successfully');
  }

  get products() {
    return this.productService.getAsObservable();
  }

  get ledgers() {
    return this.ledgerService.getAsObservable();
  }
}
