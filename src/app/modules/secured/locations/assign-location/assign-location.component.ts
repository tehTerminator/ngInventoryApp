import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './../../../../services/locations/locations.service';
import { UserService } from './../../../../services/user/user.service';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { EMPTYLOCATION, StoreLocation } from './../../../../interface/location.interface';
import { User } from '../../../../interface/user.interface';
import { Product } from '../../../../interface/product.interface';
import { ApiService } from '../../../../services/api/api.service';


@Component({
  selector: 'app-assign-location',
  templateUrl: './assign-location.component.html',
  styleUrls: ['./assign-location.component.scss']
})
export class AssignLocationComponent implements OnInit {
  private _id = 0;
  private _products = new BehaviorSubject<Product[]>([]);
  public title = EMPTYLOCATION.title;

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
      next: (query) => {
        this.id = query.get('id');
      },
      error: () => this.router.navigate(['../view'], {relativeTo: this.route})
    });

  }

  set id(value: number | string | null ) {
    if (typeof(value) === 'string') {
      this._id = parseInt(value);
    } else {
      this._id = value || 0;
    }

    console.log('set(id)', this.id, value);

    try{
      this.title = this.locationStore.getElementById(this.id).title;
      console.log('TRY', this.title);
    } catch (e) {
      this.title = EMPTYLOCATION.title;
      console.log(e);
    }
  }

  get id(): number {
    return this._id;
  }

  get users(): Observable<User[]> {
    return this.userStore.getAsObservable();
  }
}

