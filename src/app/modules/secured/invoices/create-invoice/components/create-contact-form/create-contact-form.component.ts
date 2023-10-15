import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../services/api/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { Subscription } from 'rxjs';
import { Contact } from './../../../../../../interface/contact';
import { ActivatedRoute, Router } from '@angular/router';

const mobilePattern = '^[6-9][0-9]{9}$';

class ContactForm extends FormGroup {
  constructor() {
    super({
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      address: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      mobile: new FormControl('', {
        validators: [Validators.required, Validators.pattern(mobilePattern)],
      }),
      kind: new FormControl('CUSTOMER'),
    });
  }

  get titleFormControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get addressFormControl(): FormControl<string> {
    return this.get('address') as FormControl<string>;
  }

  get mobileFormControl(): FormControl<string> {
    return this.get('mobile') as FormControl<string>;
  }

  set kind(value: string) {
    this.patchValue({ kind: value });
  }
}

@Component({
  selector: 'app-create-contact-form',
  templateUrl: './create-contact-form.component.html',
  styleUrls: ['./create-contact-form.component.scss'],
})
export class CreateContactFormComponent implements OnInit, OnDestroy {
  private _loading = false;
  contactForm = new ContactForm();
  private _sub = new Subscription();

  constructor(
    private api: ApiService,
    private store: InvoiceStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._sub = this.store.invoice.subscribe({
      next: (invoice) => {
        this.contactForm.kind = invoice.kind === 'sales' ? 'CUSTOMER' : 'SUPPLIER';
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSubmit() {

    console.log('Submit Button Pressed');
    if (!this.contactForm.valid) {
      console.log('Contact Form Invalid');
      return;
    }

    this._loading = true;
    
    console.log('Sending', this.contactForm.value);
    this.api.create<Contact>(['contact'], this.contactForm.value).subscribe({
      next: (contact) => {
        this.store.contact = contact;
        this._loading = false;
        this.navigateToSelectProduct();
      },
      error: () => {
        this._loading = false;
      }
    });
  }

  private navigateToSelectProduct() {
    // Get the current :type parameter from the route
    const type = this.route.snapshot.paramMap.get('type');

    // Navigate to the relative path for select-product
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
      queryParams: { type: type },
    });
  }

  get loading(): boolean {
    return this._loading;
  }
}
