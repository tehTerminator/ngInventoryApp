import { Component } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { BehaviorSubject, finalize, from, Observable } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { ProductService } from '../../../../services/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {

  private _loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.init();
  }


  get products(): Observable<Product[]> {
    return this.productService.getAsObservable();
  }

  get loading(): boolean {
    return this._loading;
  }
}
