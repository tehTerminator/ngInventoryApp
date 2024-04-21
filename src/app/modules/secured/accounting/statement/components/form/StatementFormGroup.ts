import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ledger } from '../../../../../../interface/ledger.interface';

export class StatementFormGroup extends FormGroup {
  constructor() {
    super({
      ledger: new FormControl<Ledger | null>(null, Validators.required),
      fromDate: new FormControl<Date>(new Date(), Validators.required),
      toDate: new FormControl<Date>(new Date(), Validators.required),
    });
  }

  get ledgerFormControl(): FormControl<Ledger> {
    return this.get('ledger') as FormControl<Ledger>;
  }

  get ledger(): Ledger {
    return this.ledgerFormControl.value;
  }

  get fromDateFormControl(): FormControl<Date> {
    return this.get('fromDate') as FormControl<Date>;
  }

  get fromDate(): string {
    return this.parseDate(this.fromDateFormControl.value);
  }

  get toDateFormControl(): FormControl<Date> {
    return this.get('toDate') as FormControl<Date>;
  }

  get toDate(): string {
    return this.parseDate(this.toDateFormControl.value);
  }

  private parseDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
