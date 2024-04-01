import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserStoreService } from '../../services/user/user.service';
import { LocationService } from '../../services/locations/locations.service';
import { LedgerService } from '../../services/ledger/ledger.service';
import { ProductService } from '../../services/product/product.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { BundleService } from '../../services/bundle/bundle.service';
import { MyLocationStoreService } from '../../services/myLocation/my-location.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss']
})
export class SecuredComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private userService: UserStoreService,
    private locationService: LocationService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private contactService: ContactsService,
    private bundleService: BundleService,
    private myLocationStore: MyLocationStoreService,
  ) {}

  ngOnInit(): void {
    this.userService.init();
    this.locationService.init();
    this.ledgerService.init();
    this.productService.init();
    this.contactService.init();
    this.bundleService.init();
    this.myLocationStore.retrieveData();
  }

  logout = () => this.authService.signOut();
}
