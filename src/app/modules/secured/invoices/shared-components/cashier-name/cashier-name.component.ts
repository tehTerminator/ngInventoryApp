import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { UserStoreService } from './../../../../../services/user/user.service';

@Component({
    selector: 'app-cashier-name',
    template: ` {{ cashier }} `,
    standalone: false
})
export class CashierNameComponent implements OnInit  {

  constructor(
    private userStore: UserStoreService,
    private invoiceStore: InvoiceStoreService
  ) {}

  ngOnInit(): void {
    this.userStore.init();
  }

  get cashier() {
    try{
      const theName = this.userStore.getElementById(this.invoiceStore.invoice().user_id).name;
      return theName;
    } catch {
      return 'Anonymous';
    }
  }

}
