import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LedgerForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0, [Validators.min(0)]),
      title: new FormControl('', [Validators.required, Validators.pattern(STRING)]),
      kind: new FormControl('', Validators.required)
    });
  }

  get editMode(): boolean {
    return this.id > 0;
  }

  get id(): number {
    return this.idField.value;
  }

  get title(): string {
    return this.titleField.value;
  }

  get kind(): string {
    return this.kindField.value;
  }

  get idField(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get titleField(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get kindField(): FormControl<string> {
    return this.get('kind') as FormControl<string>;
  }
}
export const STRING = '^[a-zA-Z][a-zA-Z\\s]+$';
