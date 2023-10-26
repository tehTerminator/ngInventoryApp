import { Component } from '@angular/core';
import { ApiService } from '../../../../../../services/api/api.service';
import { Invoice } from '../../../../../../interface/invoice';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { Router } from '@angular/router';
import { MyLocationService } from './../../../../../../services/myLocation/my-location.service';

@Component({
  selector: 'app-final-submit',
  templateUrl: './final-submit.component.html',
  styleUrls: ['./final-submit.component.scss']
})
export class FinalSubmitComponent {
  loading = false;

  constructor(
    private api: ApiService,
    private store: InvoiceStoreService,
    private router: Router,
    private myLocationStore: MyLocationService
  ) {}

  saveInvoice(): void {

    const transactions = this.store.snapshot.transactions;
    let amount = 0;

    transactions.forEach(t => {
      amount += t.amount;
    });

    this.store.amount = amount;
    this.store.location = this.myLocationStore.snapshot.selected.id;

    this.api.create<Invoice>(['invoice'], this.store.snapshot)
    .subscribe({
      next: (value) => {
        console.log(value);
      }
    })
  }
}
