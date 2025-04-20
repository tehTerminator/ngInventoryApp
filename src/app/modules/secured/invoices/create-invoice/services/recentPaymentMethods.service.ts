import { Injectable } from "@angular/core";
import { Ledger } from "../../../../../interface/ledger.interface";
import { LedgerService } from "../../../../../services/ledger/ledger.service";

@Injectable()
export class RecentPaymentMethodService {
    private recentLedgers: Ledger[] = [];
    private maxItems = 3;

    constructor(private ledgerService: LedgerService) {
        if (localStorage.getItem('recentPaymentMethods')) {
            this.recentLedgers = JSON.parse(localStorage.getItem('recentPaymentMethods') || '[]');
        }
        this.ledgerService.init();
    }

    savePaymentMethod(ledger: Ledger): void {
        if (this.isInList(ledger)) {
            console.error('Invalid ledger or ledger already exists:', ledger);
            return;
        }

        console.log('Before Unshift', this.recentLedgers);
        this.recentLedgers.unshift(ledger);
        console.log('After Unshift', this.recentLedgers);
        if (this.recentLedgers.length > this.maxItems) {
            this.recentLedgers.pop();
        }
        localStorage.setItem('recentPaymentMethods', JSON.stringify(this.recentLedgers));
    }

    getPaymentMethods(): Ledger[] {
        return this.recentLedgers;
    }

    
    private isInList(ledger: Ledger): boolean {
        if (this.ledgerService.isInstanceOfLedger(ledger)){
            return this.recentLedgers.some((method) => method.id === ledger.id);
        }
        return false;
    }

    isEmpty(): boolean {
        return this.recentLedgers.length === 0;
    }
}

