import { Component, effect, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators'; // Import switchMap and tap
import { Ledger } from '../../../../../../interface/ledger.interface';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { SelectLedgerFG } from './SelectLedgerFG';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { RecentPaymentMethodService } from '../../../services/recentPaymentMethods.service';
import { FormControl } from '@angular/forms'; // Import FormControl

@Component({
  selector: 'app-select-ledger-form',
  templateUrl: './select-ledger-form.component.html',
  styles: [],
  standalone: false
})
export class SelectLedgerFormComponent implements OnInit {
  // Initialize form with SelectLedgerFG
  form = new SelectLedgerFG();
  selectedLedgerIds: Array<number> = [];
  loading = false;

  // Observable for filtered ledgers in the autocomplete dropdown
  filteredLedgers!: Observable<Ledger[]>;
  // Private array to hold all ledgers (filtered by can_pay/can_receive_payment)
  private allAvailableLedgers: Ledger[] = [];

  constructor(
    private ledgerService: LedgerService,
    private store: InvoiceStoreService,
    private router: Router,
    private recentPaymentService: RecentPaymentMethodService,
    private notice: NotificationsService
  ) {
    // Effect to update amount when unpaidAmount changes in the store
    effect(() => {
      this.form.patchValue({ amount: this.store.unpaidAmount() });
    });
  }

  ngOnInit(): void {
    // Initialize ledger service to fetch ledgers
    this.ledgerService.init();

    // Subscribe to the ledgers observable to get the full list
    // and then initialize the filteredLedgers observable for autocomplete.
    this.getLedgersObservable().pipe(
      tap(ledgers => {
        // Store the full list of ledgers (filtered by sales/purchase context)
        this.allAvailableLedgers = ledgers;
      }),
      switchMap(() =>
        // Listen to value changes on the 'ledger' form control
        this.ledgerFormControl.valueChanges.pipe(
          startWith(''), // Emit an empty string initially to show all options
          map(value => {
            // Determine the filter value:
            // If it's a number (meaning an ID was selected), find its title for filtering.
            // If it's a string (user typing), use it directly.
            const filterValue = typeof value === 'number'
              ? this.displayLedgerTitle(value) // Get title for selected ID
              : value;
            // Filter the allAvailableLedgers based on the input string
            return this._filter(filterValue || '');
          })
        )
      )
    ).subscribe(filtered => {
      this.filteredLedgers = of(filtered); // Update the observable for the template
    });
  }

  // Getter for the 'ledger' FormControl for easier access and type safety
  get ledgerFormControl(): FormControl {
    return this.form.get('ledger') as FormControl;
  }

  // Helper getter to get the ledgers from the service, filtered by context (SALES/PURCHASE)
  private getLedgersObservable(): Observable<Ledger[]> {
    return (this.ledgerService.getAsObservable() as Observable<Ledger[]>).pipe(
      map((ledgers) => {
        if (this.store.kind() === 'SALES') {
          return ledgers.filter((x) => x.can_receive_payment === true);
        }
        return ledgers.filter((x) => x.can_pay === true);
      })
    );
  }

  // Method required by mat-autocomplete's [displayWith] to show the ledger title
  // when a ledger ID is selected in the input field.
  displayLedgerTitle = (ledgerId: number): string => {
    if (!ledgerId) {
      return '';
    }
    const selectedLedger = this.allAvailableLedgers.find(ledger => ledger.id === ledgerId);
    return selectedLedger ? selectedLedger.title : '';
  }

  // Private method to filter the ledgers based on a search string
  private _filter(value: string): Ledger[] {
    const filterValue = value.toLowerCase();
    return this.allAvailableLedgers.filter(ledger =>
      ledger.title.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    this.loading = true;

    // Get the ledger ID from the form control. It will be a number if an option was selected.
    // If the user typed something but didn't select, it might be a string.
    // We need to ensure it's a valid number ID.
    const selectedLedgerId = this.ledgerFormControl.value;

    if (this.form.invalid || typeof selectedLedgerId !== 'number') {
      console.log('Invalid select-ledger-form Data or no valid ledger selected.');
      this.notice.show('Please select a valid payment method from the list.');
      this.loading = false;
      return;
    }

    if (this.isSelected(selectedLedgerId)) {
      this.loading = false;
      this.notice.show('Ledger Already Selected');
      return;
    }

    this.selectedLedgerIds.push(selectedLedgerId);
    // Use the selectedLedgerId (which is a number) to get the ledger details
    const ledger = this.ledgerService.getElementById(selectedLedgerId);

    // Ensure ledger is not null/undefined before proceeding
    if (!ledger) {
      this.notice.show('Selected ledger not found.');
      this.loading = false;
      return;
    }

    this.store.addPaymentMethod(selectedLedgerId, this.form.amount);
    this.recentPaymentService.savePaymentMethod(ledger);

    if (this.store.netAmount() > 0 && this.store.unpaidAmount() === 0) {
      this.router.navigate(['/auth', 'invoices', 'please-wait']);
    }
    this.loading = false;
  }

  // isSelected method remains the same, checking against the array of selected IDs
  isSelected(id: number): boolean {
    return this.selectedLedgerIds.includes(id);
  }

  get buttonText(): string {
    if (this.form.amount === this.store.unpaidAmount()) {
      return 'Final Submit';
    }
    return 'Add Voucher';
  }
}