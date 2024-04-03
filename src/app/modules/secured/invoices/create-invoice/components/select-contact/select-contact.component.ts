import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import {
  EMPTY,
  Observable,
  Subscription,
  map,
  startWith,
} from 'rxjs';
import { Contact } from './../../../../../../interface/contact.interface';
import { ContactsService } from '../../../../../../services/contacts/contacts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.scss'],
})
export class SelectContactComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('customerTextField') input!: ElementRef<HTMLInputElement>;
  label = 'Party';
  contactField = new FormControl<Contact | string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  contactForm = new FormGroup({contact: this.contactField});
  filteredContacts$: Observable<Contact[]> = EMPTY;
  private _sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: InvoiceStoreService,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.createSubscription();
    this.contactsService.init();

    this.filteredContacts$ = this.contactField.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (typeof value === 'string') {
          return this._filterContacts(value);
        }
        return [];
      })
    );
  }

  private _filterContacts(title: string) {
    const kind = this.store.kind === 'SALES' ? 'CUSTOMER' : 'SUPPLIER';
    return this.contactsService
      .getAsList()
      .filter(
        (x) =>
          x.kind === kind && x.title.toLowerCase().includes(title.toLowerCase())
      );
  }

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSelectCustomer(event: MatAutocompleteSelectedEvent) {
    const selectedItem: Contact | string = event.option.value;
    if (selectedItem === null || typeof selectedItem === 'string') {
      return;
    }
    this.store.contact = selectedItem.id;
  }

  navigateToSelectProduct() {
    // Navigate to the relative path for select-product
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
    });
  }

  get contacts(): Observable<Contact[]> {
    const contactKind = this.label === 'Party' ? 'CUSTOMER' : 'SUPPLIER';
    return this.contactsService
      .getAsObservable()
      .pipe(map((contacts) => contacts.filter((x) => x.kind === contactKind)));
  }

  displayFn(contact: string | Contact): string {
    if (typeof contact === 'string') {
      return '';
    }
    return contact && contact.title ? contact.title : '';
  }

  private createSubscription() {
    this._sub = this.store.invoice.subscribe({
      next: (invoice) => {
        switch (invoice.kind) {
          case 'SALES':
            this.label = 'Party';
            break;
          default:
            this.label = 'Supplier';
            break;
        }
      },
    });
  }
}
