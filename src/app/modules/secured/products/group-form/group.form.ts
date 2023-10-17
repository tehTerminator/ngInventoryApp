import { FormControl, FormGroup, Validators } from '@angular/forms';

export class GroupForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0, { validators: [Validators.min(0)] }),
      title: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)] })
    });
  }

  get idFormControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get titleFormControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get id(): number {
    return this.idFormControl.value;
  }

  set id(value: number) {
    this.idFormControl.patchValue(value);
  }

  get title(): string {
    return this.titleFormControl.value;
  }
}
