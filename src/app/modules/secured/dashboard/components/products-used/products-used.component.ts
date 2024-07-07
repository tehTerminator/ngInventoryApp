import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../../../../services/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { BundleService } from './../../../../../services/bundle/bundle.service';
import { ProductService } from './../../../../../services/product/product.service';

@Component({
  selector: 'app-products-used',
  templateUrl: './products-used.component.html',
})
export class ProductsUsedComponent implements AfterViewInit, OnInit {
  list = new BehaviorSubject<ProductsUsed[]>([]);
  constructor(
    private bundleService: BundleService,
    private productService: ProductService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.bundleService.init();
    this.productService.init();
  }

  ngAfterViewInit(): void {
    this.api.retrieve<ProductsUsed[]>('productsUsed').subscribe({
      next: (data) => {
        data.forEach((item) => {
          if (item.item_type === 'BUNDLE') {
            item.title = this.bundleService.getElementById(item.item_id).title;
          } else {
            item.title = this.productService.getElementById(item.item_id).title;
          }
        });
        this.list.next(data);
      },
    });
  }
}

interface ProductsUsed {
  title: string;
  item_id: number;
  item_type: 'PRODUUCT' | 'BUNDLE';
  rate: number;
  total_quantity: number;
}
