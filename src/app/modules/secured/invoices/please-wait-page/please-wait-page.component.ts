import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../services/invoice-store.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-please-wait-page',
  templateUrl: './please-wait-page.component.html',
  styleUrls: ['./please-wait-page.component.scss']
})
export class PleaseWaitPageComponent implements OnInit {
  constructor(private store: InvoiceStoreService){}

  ngOnInit(): void {
    this.setAmount();
  }

  private setAmount() {
    this.store.netAmount.pipe(take(1))
    .subscribe({
      next: (value => this.store.amount = value)
    })
  }
}
