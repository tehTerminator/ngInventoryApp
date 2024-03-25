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
import { EMPTY, Observable, Subscription, map, startWith } from 'rxjs';
import { ApiService } from './../../../../../../services/api/api.service';
import { Contact } from './../../../../../../interface/contact.interface';
import { ContactsService } from '../../../services/contacts.service';
import { SelectContactForm } from './SelectContactForm';

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
  contactForm = new SelectContactForm();
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
  }

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contact = this.contactForm.contact;

    if (contact > 0) {
      this.store.contact = contact;
      this.navigateToSelectProduct();
    } else {
      console.log(this.contactForm.value);
    }
  }

  navigateToSelectProduct() {

    // Navigate to the relative path for select-product
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
    });
  }

  get contacts(): Observable<Contact[]> {
    const contactKind = this.label === 'Party' ? 'CUSTOMER' : 'SUPPLIER';
    return this.contactsService.getAsObservable().pipe(map(
      contacts => contacts.filter(x=> x.kind === contactKind )
    ));
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
