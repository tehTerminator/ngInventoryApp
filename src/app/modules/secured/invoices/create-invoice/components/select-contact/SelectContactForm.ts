import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SelectContactForm extends FormGroup {
  constructor() {
    super({
      contact: new FormControl<string>('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]+:[A-Za-z- ]+$/)],
      }),
    });
  }

  get contactField(): FormControl<string> {
    return this.get('contact') as FormControl<string>;
  }

  get contact(): number {
    try{
      const id = parseInt(this.contactField.value.split(":")[0]);
      return id;
    } catch(e) {
      return 0;
    }
  }
}
