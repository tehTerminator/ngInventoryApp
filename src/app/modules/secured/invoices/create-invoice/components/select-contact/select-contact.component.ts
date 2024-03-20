import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import {
  EMPTY,
  Observable,
  Subscription,
  map,
  startWith,
} from 'rxjs';
import { ApiService } from './../../../../../../services/api/api.service';
import { Contact } from './../../../../../../interface/contact.interface';
import { ContactsService } from '../../../services/contacts.service';
import { SelectContactForm } from './SelectContactForm';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.scss'],
})
export class SelectContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('customerTextField') input!: ElementRef<HTMLInputElement>;
  label = 'Party';
  filteredContacts: Observable<any> = EMPTY;
  contactForm = new SelectContactForm();
  private _sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: InvoiceStoreService,
    private api: ApiService,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.createSubscription();
    this.contactsService.init();
    this.filteredContacts = this.contactForm.contactField.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (typeof(value) === 'string') {
          return this._filter(value)
        }
        return [value];
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.input !== null){
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  private _filter(title: string): Contact[] {
    const customer = this.contactsService.getAsList() as Contact[];
    try{
      const t = title.toLowerCase();
      return customer.filter(
        x => x.title.toLowerCase().indexOf(t) >= 0
      );
    } catch (e) {
      return customer;
    }
  }

  onSubmit(): void {
    const contact = this.contactForm.contact;
    if (!!contact) {
      this.store.contact = contact;
      this.navigateToSelectProduct();
    } else {
      console.log(contact);
    }
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

  get customers(): Observable<Contact[]> {
    return this.contactsService.getAsObservable();
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

  displayFn(customer: Contact): string {
    return customer && customer.title ? customer.title : '';
  }
}


