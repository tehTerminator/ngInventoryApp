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
import { Contact } from './../../../../../../interface/contact.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../../../../../services/api/api.service';


@Component({
  selector: 'app-search-customer',
  standalone: false,
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss'
})
export class SearchCustomerComponent {
@ViewChild('customerTextField') input!: ElementRef<HTMLInputElement>;
  label = 'Party';
  contactField = new FormControl<string>('9999999999', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(10), Validators.pattern('^[6-9][0-9]{9}$')],
  });
  contactForm = new FormGroup({
    'mobile': this.contactField
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private store: InvoiceStoreService,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
  }

  navigateToSelectProduct() {
    // Navigate to the relative path for select-product
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
    });
  }

  onSubmit() {
    // alert('onSubmit()');
    let mobile = this.contactField.value;
    const contact = this.checkLocalContact(mobile);

    if (contact) {
      this.store.contact = contact.id;
      this.navigateToSelectProduct();
      return;
    }

    this.api.retrieve<Contact>('contact', {mobile})
    .subscribe({
        next: (value => {
          this.store.contact = value.id;
          this.storeCustomerData(value);
          this.navigateToSelectProduct();
        }),
        error: ((err) => {
          this.navigateToCreateContact();
          console.error(err);
        })
      })
  }

  private storeCustomerData(data: Contact) {
    localStorage.setItem('contact', JSON.stringify(data));
  }

  private checkLocalContact(mobile: string) {
    const contactData = localStorage.getItem('contact')
    if (!!contactData) {
      const localContact: Contact = JSON.parse(contactData) as Contact;
      if (localContact.mobile === mobile) {
        return localContact;
      }
    }
    return false;
  }

  navigateToCreateContact() {
    this.router.navigate(['../create-contact'], {
      relativeTo: this.route, queryParams: {mobile: this.contactField.value}
    })
  }
}
