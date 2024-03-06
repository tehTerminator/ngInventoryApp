import { Component, OnInit } from '@angular/core';
import { DefaultForm } from './../../../../class/DefaultForm';
import { formData } from './formData';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private _loading = false;
  form = new BundleForm();

  get loading(): boolean {
    return this._loading;
  }

  get formData() {
    return formData;
  }

  onSubmit() {
    return;
  }
}

class BundleForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0, [Validators.min(0)]),
      title: new FormControl<string>('', Validators.required),
      rate: new FormControl<number>(0, [Validators.required, Validators.min(1)])
    });
  }

  get titleControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get rateControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }

  get idControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get title(): string {
    return this.titleControl.value;
  }

  get rate(): number {
    return this.rateControl.value;
  }

  get id(): number {
    return this.idControl.value;
  }  

  get editMode(): boolean {
    return this.id > 0;
  }
}


