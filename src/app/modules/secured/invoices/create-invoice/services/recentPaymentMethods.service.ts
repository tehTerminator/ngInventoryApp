import { effect, Injectable } from "@angular/core";
import { Ledger } from "../../../../../interface/ledger.interface";
import { LedgerService } from "../../../../../services/ledger/ledger.service";

@Injectable()
export class RecentPaymentMethodService {
    private recentLedgers: Ledger[] = [];
    private maxItems = 3;

    constructor(private ledgerService: LedgerService) {
        const savedMethods = localStorage.getItem('recentPaymentMethods');
        if (savedMethods) {
            this.recentLedgers = JSON.parse(savedMethods);
        }

        effect(() => {
            localStorage.setItem('recentPaymentMethods', JSON.stringify(this.recentLedgers));
        });

        this.ledgerService.init();
    }

    savePaymentMethod(ledger: Ledger): void {
        if (this.isInList(ledger)) {
            console.error('Ledger already exists:', ledger);
            return;
        }
        this.recentLedgers.unshift(ledger);
        if (this.recentLedgers.length > this.maxItems) {
            this.recentLedgers.pop();
        }
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

