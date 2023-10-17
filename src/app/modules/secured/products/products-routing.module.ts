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
    path: 'product-group/add',
    loadChildren: () =>
      import('./group-form/group-form.module').then((m) => m.GroupFormModule),
  },
  {
    path: 'product-group/edit/:id',
    loadChildren: () =>
      import('./group-form/group-form.module').then((m) => m.GroupFormModule),
  },
  {
    path: 'product-group/view',
    loadChildren: () =>
      import('./list-product-group/list-product-group.module').then(
        (m) => m.ListProductGroupModule
      ),
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./list-product/list-product.module').then(
        (m) => m.ListProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
