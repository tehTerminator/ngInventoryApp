import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './../../../../services/locations/locations.service';
import { UserService } from './../../../../services/user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EMPTYLOCATION, StoreLocation } from './../../../../interface/location';
import { User } from '../../../../interface/user';
import { Product } from '../../../../interface/product';
import { ApiService } from '../../../../services/api/api.service';


@Component({
  selector: 'app-assign-location',
  templateUrl: './assign-location.component.html',
  styleUrls: ['./assign-location.component.scss']
})
export class AssignLocationComponent implements OnInit {
  private _id = 0;
  private _products = new BehaviorSubject<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationStore: LocationService,
    private userStore: UserService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.locationStore.init();
    this.userStore.init();

    this.route.paramMap.subscribe({
      next: (value) => {
        this.id = value.get('id');
        this.loadProducts();
      },
      error: () => this.router.navigate(['../view'], {relativeTo: this.route})
    });

  }

  private loadProducts(): void {
    this.api.retrieve<Product[]>('inventory', {location: this.id.toString()})
    .subscribe({
      next: (value) => this.products = value
    });
  }

  set id(value: number | string | null ) {
    if (typeof(value) === 'string') {
      this._id = parseInt(value);
    } else {
      this._id = value || 0;
    }
  }

  get id(): number {
    return this._id;
  }

  get location(): StoreLocation {
    try{
      return this.locationStore.getElementById(this.id);
    } catch(e) {
      return EMPTYLOCATION;
    }
  }

  get users(): Observable<User[]> {
    return this.userStore.getAsObservable();
  }

  get products(): Observable<Product[]>{
    return this._products;
  }

  set products(value: Product[]) {
    this._products.next(value);
  }
}

