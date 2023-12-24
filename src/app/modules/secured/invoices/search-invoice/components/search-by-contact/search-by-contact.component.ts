import { Component } from '@angular/core';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Contact } from '../../../../../../interface/contact';
import { ApiService } from '../../../../../../services/api/api.service';
import { SearchInvoiceStoreService } from '../../search-store/search-store.service';
import { SearchCustomerForm } from './SearchCustomerForm';

@Component({
  selector: 'app-search-by-contact',
  templateUrl: './search-by-contact.component.html',
  styleUrls: ['./search-by-contact.component.scss'],
})
export class SearchByContactComponent {
  form = new SearchCustomerForm();

  private _sub = new Subscription();
  filteredContacts: Observable<Contact[]>;

  constructor(
    private api: ApiService,
    private searchStore: SearchInvoiceStoreService
  ) {
    this.filteredContacts = this.form.contactFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Add a debounce time to reduce API requests
      distinctUntilChanged(), // Only make requests if the input value changes
      switchMap((value) => {
        if (typeof value === 'string') {
          return this.api.retrieve<Contact[]>(['get', 'contacts'], {
            title: value,
          });
        } else {
          // Assuming 'value' is a Contact object with a 'title' property
          return of([value]);
        }
      })
    );
  }

  public displayFunction(contact: Contact): string {
    return contact && contact.title ? contact.title : '';
  }

  onSubmit(): void {
    // this.searchStore.fetchUsingContactId(this.customerId, this.month, this.paymentStatus);
  }
}


