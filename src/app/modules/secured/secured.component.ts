import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserStoreService } from '../../services/user/user.service';
import { LocationService } from '../../services/locations/locations.service';
import { LedgerService } from '../../services/ledger/ledger.service';
import { ProductService } from '../../services/product/product.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { BundleService } from '../../services/bundle/bundle.service';
import { MyLocationStoreService } from '../../services/myLocation/my-location.service';
import { ApiService } from '../../services/api/api.service';
import { User } from '../../services/authentication/user.model';
import { Bundle } from '../../interface/bundle.interface';
import { Contact } from '../../interface/contact.interface';
import { Ledger } from '../../interface/ledger.interface';
import { StoreLocation } from '../../interface/location.interface';
import { Product } from '../../interface/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss'],
})
export class SecuredComponent implements OnInit {
  constructor(
    private userService: UserStoreService,
    private locationService: LocationService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private contactService: ContactsService,
    private bundleService: BundleService,
    private myLocationStore: MyLocationStoreService,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.api.retrieve<CombinedData>('data').subscribe({
      next: (value) => {
        this.productService.store(value.products);
        this.ledgerService.store(value.ledgers);
        this.userService.store(value.users);
        this.bundleService.store(value.bundles);
        this.locationService.store(value.locations);
        this.contactService.store(value.contacts);
      },
    });
    this.myLocationStore.retrieveData();
  }

  onOpenCalc() {
    this.dialog.open(CalculatorComponent);
  }
}

interface CombinedData {
  products: Product[];
  ledgers: Ledger[];
  users: User[];
  bundles: Bundle[];
  locations: StoreLocation[];
  contacts: Contact[];
}
