import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferProductComponent } from './transfer-product.component';

const routes: Routes = [{ path: '', component: TransferProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferProductRoutingModule { }
