import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ledger } from '../../../../../../../interface/ledger.interface';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';

@Component({
    selector: 'app-recent-payment-btn',
    template: `
            <section class="card" *ngIf="recentPaymentMethod">
                <div class="card-header">Recent Payment Method</div>
                <div class="card-body">
                <button
                    class="btn btn-secondary w-100 p-3 mt-2"
                    (click)="selectPaymentMethod(recentPaymentMethod)"
                >
                    {{ recentPaymentMethod.title }}
                </button>
                </div>
            </section>`
})
export class RecentPaymentBtnComponent {
    constructor(
        private store: InvoiceStoreService,
        private router: Router
    ) { }

    selectPaymentMethod(ledger: Ledger): void {
        // this.store.paymentMethod = ledger.id;
        // this.store.paid = true;
        // this.router.navigate(['/invoices', 'wait']);
    }

    get recentPaymentMethod(): Ledger | null {
        const recent = localStorage.getItem('recentPaymentMethod');
        if (recent !== null) {
            return JSON.parse(recent);
        }
        return null;
    }
}
