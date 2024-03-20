import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ledger } from '../../../../../..interface/ledger.interface';

export class StatementFormGroup extends FormGroup {
  constructor() {
    super({
      ledger: new FormControl(0, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required)
    });
  }

  get ledgerFormControl(): FormControl<Ledger> {
    return this.get('ledger') as FormControl<Ledger>;
  }

  get ledger(): Ledger {
    return this.ledgerFormControl.value;
  }

  get fromDateFormControl(): FormControl<string> {
    return this.get('fromDate') as FormControl<string>;
  }

  get fromDate(): string {
    return this.fromDateFormControl.value;
  }

  get toDateFormControl(): FormControl<string> {
    return this.get('toDate') as FormControl<string>;
  }

  get toDate(): string {
    return this.toDateFormControl.value;
  }
}
