import { Component } from '@angular/core';
import { Product } from '../../../../interface/product';
import { BehaviorSubject, finalize, from, Observable } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {
  private _products = new BehaviorSubject<Product[]>([]);
  private _loading = false;

  displayedColumns: string[] = ['title']; // Add more columns as needed
  pageSize = 10;
  currentPage = 1;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  nextPage() {
    this.currentPage += 1;
    this.fetchData();
  }

  prevPage() {
    this.currentPage -= 1;
    this.fetchData();
  }

  private fetchData(): void {
    this._loading = true;
    this.api
      .retrieve<Product[]>('products', {
        pageLength: this.pageSize.toString(),
        currentPage: this.currentPage.toString(),
      })
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (value) => this._products.next(value),
        error: () => this._products.next([]),
      });
  }

  get products(): Observable<Product[]> {
    return this._products;
  }

  get loading(): boolean {
    return this._loading;
  }

  get hasNext(): boolean {
    return this._products.value.length === this.pageSize
  }

  get hasPrev(): boolean {
    return this.currentPage >= 2;
  }
}
