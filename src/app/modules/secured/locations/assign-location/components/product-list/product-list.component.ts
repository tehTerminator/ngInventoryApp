import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../../../services/api/api.service';
import { Entity } from '../../../../../../interface/entity.interface';
import { Product } from '../../../../../../interface/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges {
  @Input('location') location = 0;
  private _data$ = new BehaviorSubject<StockInfo[]>([]);
  constructor(private api: ApiService){ }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'].currentValue !== changes['location'].previousValue) {
      this.loadProducts();
    }
  }

  loadProducts() {
    this.api.fetch_data<StockInfo[]>(['get', 'location', 'inventory'], {id: this.location.toString()})
    .subscribe({
      next: (value) => {
        this._data$.next(value)
      }
    })
  }

  get product$(): Observable<StockInfo[]>{
    return this._data$;
  }
}

interface StockInfo extends Entity {
  product: Product;
  product_id: number;
  quantity: number;
}
