import { AfterViewInit, Component, effect, OnDestroy } from '@angular/core';
import { SelectVoucherFormGroup } from './SelectVoucherFormGroup';
import { ApiService } from './../../../../../../services/api/api.service';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { Voucher } from './../../../../../../interface/voucher.interface';
import { InvoiceStoreService } from './../../../services/invoice-store.service';
import { Router } from '@angular/router';
import { ContactsService } from '../../../../../../services/contacts/contacts.service';
import { NotificationsService } from '../../../../../../services/notification/notification.service';

@Component({
    selector: 'app-prepaid-vouchers',
    templateUrl: './prepaid-vouchers.component.html',
    standalone: false
})
export class PrepaidVouchersComponent implements AfterViewInit, OnDestroy {
  private _notifier$ = new Subject();

  voucher: Voucher | null = null;
  formGroup = new SelectVoucherFormGroup();

  constructor(
    private api: ApiService,
    private store: InvoiceStoreService,
    private contactService: ContactsService,
    private notifications: NotificationsService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.formGroup.invalid) {
      this.notifications.show('Invalid Form Data');
      console.error(this.formGroup.errors);
      return;
    }

    if (this.formGroup.amount <= 0) {
      this.notifications.show('Amount <= 0');
      return;
    }

    if (this.voucher === null) {
      this.notifications.show('Voucher is null');
      return;
    }

    if (this.store.kind() === 'SALES') {
      this.store.addPaymentMethod(
        this.voucher.dr,
        this.formGroup.amount,
        this.voucher
      );
    } else {
      this.store.addPaymentMethod(
        this.voucher.cr,
        this.formGroup.amount,
        this.voucher
      );
    }

  }

  ngAfterViewInit(): void {
    this.contactService.init();
    this.formGroup.idFormControl.valueChanges
      .pipe(debounceTime(500), takeUntil(this._notifier$))
      .subscribe({
        next: (value) => {
          if (value <= 0) {
            return;
          }
          this.fetchVoucher(value);
        },
      });
  }

  ngOnDestroy(): void {
    this._notifier$.next(0);
    this._notifier$.complete();
  }

  private fetchVoucher(id: number) {
    this.api.retrieve<Voucher>(['voucher', id.toString()]).subscribe({
      next: (data) => {
        try {
          const ledger_id = this.contactService.getElementById(
            this.store.invoice().contact_id
          ).ledger_id;
          if (this.store.kind() === 'SALES' && data.cr !== ledger_id) {
            throw new Error(
              'Invalid Voucher, Voucher Cr not Equal to Customer Ledger'
            );
          } else if (this.store.kind() === 'PURCHASE' && data.dr !== ledger_id) {
            throw new Error(
              'Invalid Voucher, Voucher Dr not Equal to Supplier Ledger'
            );
          }
          this.voucher = data;
        } catch (e) {
          if (e instanceof Error) {
            this.notifications.show(e.message);
            return;
          }

          this.notifications.show('Error Occurred, Please Check Console');
          console.error(e);
        }
      },
    });
  }

  get availableAmount(): number {
    if (this.voucher === null) {
      return 0;
    }

    const voucherBalance = this.voucher.amount - this.store.paidAmount();
    if (voucherBalance <= this.store.netAmount()) {
      return voucherBalance;
    }

    return this.store.netAmount();
  }
}