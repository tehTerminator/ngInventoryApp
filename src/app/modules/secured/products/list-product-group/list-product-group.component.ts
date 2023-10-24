import { Component } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { ProductGroup } from './../../../../interface/product-group';
import { ApiService } from './../../../../services/api/api.service';

@Component({
  selector: 'app-list-product-group',
  templateUrl: './list-product-group.component.html',
  styleUrls: ['./list-product-group.component.scss']
})
export class ListProductGroupComponent {
  private _groups = new BehaviorSubject<ProductGroup[]>([]);
  private _loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this._loading = true;
    this.api.retrieve<ProductGroup[]>(['get', 'product-groups'])
    .pipe(finalize(() => this._loading = false))
    .subscribe({
      next: (value) => this._groups.next(value),
      error: () => this._groups.next([])
    });
  }

  get groups(): Observable<ProductGroup[]> {
    return this._groups;
  }

  get loading(): boolean {
    return this._loading;
  }
}
