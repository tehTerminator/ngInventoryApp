import {
  Validators,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Ledger } from '../../../../interface/ledger';

export class VoucherForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0),
      cr: new FormControl(0, Validators.required),
      dr: new FormControl(0, Validators.required),
      narration: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    });
  }

  get idFormControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get id(): number {
    return this.idFormControl.value;
  }

  set id(value: number) {
    this.idFormControl.setValue(value);
  }

  get crFormControl(): FormControl<Ledger> {
    return this.get('cr') as FormControl<Ledger>;
  }

  get cr(): Ledger {
    return this.crFormControl.value;
  }

  set cr(value: Ledger) {
    this.crFormControl.setValue(value);
  }

  get drFormControl(): FormControl<Ledger> {
    return this.get('dr') as FormControl<Ledger>;
  }

  get dr(): Ledger {
    return this.drFormControl.value;
  }

  set dr(value: Ledger) {
    this.drFormControl.setValue(value);
  }

  get narrationFormControl(): FormControl<string> {
    return this.get('narration') as FormControl<string>;
  }

  get narration(): string {
    return this.narrationFormControl.value;
  }

  set narration(value: string) {
    this.narrationFormControl.setValue(value);
  }

  get amountFormControl(): FormControl<number> {
    return this.get('amount') as FormControl<number>;
  }

  get amount(): number {
    return this.amountFormControl.value;
  }

  set amount(value: number) {
    this.amountFormControl.setValue(value);
  }

  get editMode(): boolean {
    return this.idFormControl.value > 0;
  }
}
