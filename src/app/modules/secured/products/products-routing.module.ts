import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'add',
    loadChildren: () =>
      import('./products-form/products-form.module').then(
        (m) => m.ProductsFormModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./products-form/products-form.module').then(
        (m) => m.ProductsFormModule
      ),
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./list-product/list-product.module').then(
        (m) => m.ListProductModule
      ),
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./list-product/list-product.module').then(
        (m) => m.ListProductModule
      ),
  },
  {
    path: 'transfer',
    loadChildren: () =>
      import('./transfer-product/transfer-product.module').then(
        (m) => m.TransferProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
