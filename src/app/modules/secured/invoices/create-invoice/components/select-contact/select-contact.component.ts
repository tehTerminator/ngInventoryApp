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
    selector: 'app-select-contact',
    templateUrl: './select-contact.component.html',
    styleUrls: ['./select-contact.component.scss'],
    standalone: false
})
export class SelectContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('customerTextField') input!: ElementRef<HTMLInputElement>;
  label = 'Party';
  contactField = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')],
  });
  contactForm = new FormGroup({contact: this.contactField});

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
    let mobile = this.contactField.value;
    this.api.retrieve<Contact>('contact', {mobile})
    .subscribe({
        next: (value => {
          this.store.contact = value.id;
          this.navigateToSelectProduct();
        }),
        error: ((err) => {
          this.navigateToCreateContact();
          console.error(err);
        })
      })
  }

  navigateToCreateContact() {
    this.router.navigate(['../create-contact'], {
      relativeTo: this.route,
    })
  }
}
