import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TaskFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      mobile: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
        ],
      }),
      customer: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      }),
      category: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      }),
      comment: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(3),
        ],
      }),
    });
  }

  /**
   * @returns Mobile FormControl
   */
  get mobileFC(): FormControl<string> {
    return this.get('mobile') as FormControl<string>;
  }

  /**
   * @returns Customer Name FormControl
   */
  get customerFC(): FormControl<string> {
    return this.get('customer') as FormControl<string>;
  }

  /**
   * @returns Category Name FormControl
   */
  get categoryFC(): FormControl<string> {
    return this.get('category') as FormControl<string>;
  }

  /**
   * @returns Comment FormControl
   */
  get commentFC(): FormControl<string> {
    return this.get('comment') as FormControl<string>;
  }

  /**
   * @returns Mobile Number of Customer
   */
  get mobile(): string {
    return this.mobileFC.value;
  }

  /**
   * @returns Customer Name
   */
  get customer(): string {
    return this.customerFC.value;
  }

  /**
   * @returns Category Title
   */
  get category(): string {
    return this.categoryFC.value;
  }

  /**
   * @returns Comments
   */
  get comment(): string {
    return this.commentFC.value;
  }
}
