import { Validators } from '@angular/forms';
import { FieldOptions } from '../../../../class/FormField';

export const formData: FieldOptions[]  = [
  {
    key: 'title',
    controlType: 'text',
    validators: Validators.required,
    required: true,
  },
  {
    key: 'rate',
    controlType: 'number',
    type: 'number',
    validators: [Validators.required, Validators.min(1)],
  },
];
