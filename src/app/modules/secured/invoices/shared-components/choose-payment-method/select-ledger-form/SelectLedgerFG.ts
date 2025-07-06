import { Validators, FormGroup, FormControl } from '@angular/forms';


export class SelectLedgerFG extends FormGroup {
  constructor() {
    super({
      ledger: new FormControl<number>(0, [
        Validators.required,
        Validators.min(1),
      ]),
      amount: new FormControl<number>(0, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  get ledgerFC(): FormControl<number> {
    return this.get('ledger') as FormControl<number>;
  }

  get ledger(): number {
    return this.ledgerFC.value;
  }

  get amountFC(): FormControl<number> {
    return this.get('amount') as FormControl<number>;
  }

  get amount(): number {
    return this.amountFC.value;
  }
}
