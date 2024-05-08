import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockInfo } from '../../../../interface/stock-info.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductListComponent implements OnChanges {
  @Input('location') location = 0;
  private _data$ = new BehaviorSubject<StockInfo[]>([]);
  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['location'].currentValue !== changes['location'].previousValue
    ) {
      if (this.location === 0) {
        return;
      }
      this.loadProducts();
    }
  }

  loadProducts() {
    this.api
      .retrieve<StockInfo[]>(['location', 'inventory'], {
        id: this.location.toString(),
      })
      .subscribe({
        next: (value) => {
          this._data$.next(value);
        },
      });
  }

  get product$(): Observable<StockInfo[]> {
    return this._data$;
  }
}
