import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SelectVoucherFormGroup } from './SelectVoucherFormGroup';
import { ApiService } from './../../../../../../../services/api/api.service';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { Voucher } from './../../../../../../../interface/voucher.interface';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { Router } from '@angular/router';
import { ContactsService } from '../../../../../../../services/contacts/contacts.service';
import { NotificationsService } from '../../../../../../../services/notification/notification.service';

@Component({
  selector: 'app-prepaid-vouchers',
  templateUrl: './prepaid-vouchers.component.html',
})
export class PrepaidVouchersComponent implements AfterViewInit, OnDestroy {
  private _notifier$ = new Subject();
  private existingAmount = 0;
  private invoiceAmount = 0;

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

    if (this.store.kind === 'SALES') {
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

    this.store.paidAmount.pipe(take(1), debounceTime(200)).subscribe({
      next: (value) => {
        if (value === this.invoiceAmount) {
          this.router.navigate(['/auth', 'invoices', 'please-wait']);
        }
      },
    });
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

    this.store.netAmount
      .pipe(takeUntil(this._notifier$), debounceTime(2000))
      .subscribe({ next: (value) => (this.invoiceAmount = value) });
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
            this.store.snapshot.contact_id
          ).ledger_id;
          if (this.store.kind === 'SALES' && data.cr !== ledger_id) {
            throw new Error(
              'Invalid Voucher, Voucher Cr not Equal to Customer Ledger'
            );
          } else if (this.store.kind === 'PURCHASE' && data.dr !== ledger_id) {
            throw new Error(
              'Invalid Voucher, Voucher Dr not Equal to Supplier Ledger'
            );
          }

          this.voucher = data;
          this.fetchAvailableAmount(this.voucher.id);
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

  private fetchAvailableAmount(voucher_id: number) {
    this.api
      .retrieve<PaymentInfo[]>(['invoice_payment_infos'], {
        voucher_id: voucher_id.toString(),
      })
      .subscribe({
        next: (data) => {
          let amount = 0;
          data.forEach((item) => {
            amount += item.amount;
          });
          this.existingAmount = amount;
        },
        complete: () => {
          this.formGroup.amount = this.availableAmount;
        },
      });
  }

  get availableAmount(): number {
    if (this.voucher === null) {
      return 0;
    }

    const voucherBalance = this.voucher.amount - this.existingAmount;
    if (voucherBalance <= this.invoiceAmount) {
      return voucherBalance;
    }

    return this.invoiceAmount;
  }
}

interface PaymentInfo {
  invoice_id: number;
  contact_id: number;
  voucher_id: number;
  amount: number;
}
