import { Component } from '@angular/core';
import { ApiService } from '../../../../../../services/api/api.service';
import { Invoice } from '../../../../../../interface/invoice';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { Router } from '@angular/router';
import { MyLocationStoreService } from './../../../../../../services/myLocation/my-location.service';
import { finalize } from 'rxjs';

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
    private myLocationStore: MyLocationStoreService
  ) {}

  saveInvoice(): void {
    this.loading = true;
    const transactions = this.store.snapshot.transactions;
    let amount = 0;

    transactions.forEach(t => {
      amount += t.amount;
    });

    this.store.amount = amount;
    this.store.location = this.myLocationStore.snapshot.selected.id;

    this.api.create<Invoice>(['invoice'], this.store.snapshot)
    .pipe(finalize(() => this.loading  = false))
    .subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/auth', 'invoices', 'view', value.id]);
      }
    })
  }
}
