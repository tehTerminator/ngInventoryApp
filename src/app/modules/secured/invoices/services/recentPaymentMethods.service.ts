import { computed, effect, Injectable, signal } from "@angular/core";
import { Ledger } from "../../../../interface/ledger.interface";
import { LedgerService } from "../../../../services/ledger/ledger.service";

@Injectable({
  providedIn: 'root',
})
export class RecentPaymentMethodService {
  #recentLedgers = signal<Ledger[]>(
    JSON.parse(localStorage.getItem('recentPaymentMethods') || '[]') as Ledger[]
  );
  #maxItems = 3;

  // Expose recent payment methods as a computed signal
  recentPaymentMethods = computed(() => this.#recentLedgers());
  length = computed(() => this.#recentLedgers().length);

  constructor(private ledgerService: LedgerService) {
    this.ledgerService.init();

    // Effect to persist changes to localStorage
    effect(() => {
      console.log('Effect Called');
      const ledgers = this.#recentLedgers();
      localStorage.setItem('recentPaymentMethods', JSON.stringify(ledgers));
    });
  }

  savePaymentMethod(ledger: Ledger): void {
    if (this.isInList(ledger)) {
      return;
    }

    this.#recentLedgers.update((currentValue) => {
      // Check if already present using the current value from the signal
      if (currentValue.some((item) => item.id === ledger.id)) {
        return currentValue; // Return the existing array if no change needed
      }

      // Create a new array with the new ledger at the beginning
      let newValue = [ledger, ...currentValue];

      // Trim the array if it exceeds the maximum size
      if (newValue.length > this.#maxItems) {
        newValue = newValue.slice(0, this.#maxItems); // Use slice to get a new array subset
      }

      // Return the NEW array reference
      return newValue;
    });
  }

  private isInList(ledger: Ledger): boolean {
    if (this.ledgerService.isInstanceOfLedger(ledger)) {
      return this.#recentLedgers().some((item) => item.id === ledger.id);
    }
    return false;
  }
}

