import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { Observable, Subscription, finalize, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactForm } from './ContactForm';
import { ContactsService } from '../../../../../../services/contacts/contacts.service';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { Contact } from '../../../../../../interface/contact.interface';

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
    private store: InvoiceStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactsService,
    private ledgerService: LedgerService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.ledgerService.init();
    this._sub = this.store.invoice.subscribe({
      next: (invoice) => {
        this.contactForm.kind =
          invoice.kind === 'SALES' ? 'CUSTOMER' : 'SUPPLIER';
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.notification.show('Invalid Contact Data');
      return;
    }

    this._loading = true;

    if (this.contactForm.ledger > 0) {
      console.log('Ledger Already Exists, Storing Contact', this.contactForm.value);
      this.storeContact();
      return;
    }

    console.log('Ledger does not exists, Creating New', this.contactForm.value);
    this.ledgerService
      .create({
        id: 0,
        title: this.contactForm.title,
        kind: this.contactForm.kind === 'CUSTOMER' ? 'RECEIVABLE' : 'PAYABLE',
        canReceivePayment: false,
      })
      .subscribe({
        next: (value) => {
          this.contactForm.ledgerFormControl.setValue(value.id);
          this.storeContact();
        },
        error: (error) => {
          console.error('create-contact-form', error);
          this.notification.show('Unable to Create a Ledger');
          this._loading = false;
        },
      });
  }

  private storeContact() {
    this.contactService
      .create(this.contactForm.value)
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (contact) => this.navigateToSelectProduct(contact),
      });
  }

  private navigateToSelectProduct(contact: Contact) {
    // Get the current :type parameter from the route
    this.store.contact = contact.id;
    const type = this.store.kind.toLowerCase();
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
    });
  }

  get loading() {
    return this._loading;
  }

  get ledgers() {
    return this.ledgerService.getAsObservable().pipe(
      map((value) => {
        const kind = this.store.kind === 'SALES' ? 'RECEIVABLE' : 'PAYABLE';
        return value.filter(x => x.kind === kind);
      })
    );
  }
}
