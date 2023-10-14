import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from './../services/invoice-store.service';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {
  private sub = new Subscription(() => 'EMPTY');

  constructor(
    private route: ActivatedRoute,
    private store: InvoiceStoreService,
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe({
      next: (value) => {
        const type = value.get('type') || 'EMPTY';

        if (type === 'sales' || type === 'purchase') {
          this.store.kind = type;
        }
        return;
      },
    });
  }

  get color(): 'sales' | 'purchase' { 
    return this.store.kind;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
