import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { ApiService } from './../../../../../../services/api/api.service';
import { Contact } from './../../../../../../interface/contact';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.scss'],
})
export class SelectContactComponent implements OnInit, OnDestroy {
  private _sub = new Subscription();
  label = 'Party';
  filteredContacts: Observable<Contact[]>;
  contactForm = new SelectContactForm();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: InvoiceStoreService,
    private api: ApiService
  ) {
    this.filteredContacts = this.contactForm.contactField.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Add a debounce time to reduce API requests
      distinctUntilChanged(), // Only make requests if the input value changes
      switchMap((value) => {
        if (typeof value === 'string') {
          const url = this.label === 'Party' ? 'customers' : 'suppliers';
          return this.api.fetch_data<Contact[]>(url, { title: value });
        } else {
          // Assuming 'value' is a Contact object with a 'title' property
          return of([value]);
        }
      })
    );
  }

  ngOnInit(): void {
    this.createSubscription();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      return;
    }

    if (!!this.contactForm.contact) {
      this.store.contact = this.contactForm.contact;
      this.navigateToSelectProduct();
    }
    return;
  }

  navigateToSelectProduct() {
    // Get the current :type parameter from the route
    const type = this.route.snapshot.paramMap.get('type');

    // Navigate to the relative path for select-product
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
      queryParams: { type: type },
    });
  }

  private createSubscription() {
    this._sub = this.store.invoice.subscribe({
      next: (invoice) => {
        switch (invoice.kind) {
          case 'sales':
            this.label = 'Party';
            break;
          default:
            this.label = 'Supplier';
            break;
        }
      },
    });
  }

  public displayFunction(contact: Contact): string {
    return contact && contact.title ? contact.title : '';
  }
}

class SelectContactForm extends FormGroup {
  constructor() {
    super({
      contact: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  get contactField(): FormControl<Contact> {
    return this.get('contact') as FormControl<Contact>;
  }

  get contact(): Contact | null {
    return this.contactField.value;
  }
}
