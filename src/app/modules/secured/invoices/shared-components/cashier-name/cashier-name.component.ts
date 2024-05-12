import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { UserStoreService } from './../../../../../services/user/user.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cashier-name',
  template: ` {{ cashier }} `,
})
export class CashierNameComponent implements OnInit, AfterViewInit, OnDestroy {
  cashier = '';
  private $notifier = new Subject();

  constructor(
    private userStore: UserStoreService,
    private invoiceStore: InvoiceStoreService
  ) {}

  ngOnInit(): void {
    this.userStore.init();
  }

  ngAfterViewInit(): void {
    this.invoiceStore.invoice
      .pipe(
        takeUntil(this.$notifier),
        map((value) => value.user_id)
      )
      .subscribe({
        next: (user_id) => {
          if (user_id <= 0) {
            return;
          }
          this.cashier = this.userStore.getElementById(user_id).name;
        },
        error: () => {
          this.cashier = 'Maharaja Computers';
        },
      });
  }

  ngOnDestroy(): void {
    this.$notifier.next(0);
    this.$notifier.complete();
  }
}
