import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { ContactComponent } from './components/contact/contact.component';
import { contactGuard } from './guards/contacts.guard';
import { ChoosePaymentMethodComponent } from './components/choose-payment-method/choose-payment-method.component';
import { paymentGuard } from './guards/payment.guard';
import { SetDiscountComponent } from './components/set-discount/set-discount.component';
import { discountGuard } from './guards/discount.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateInvoiceComponent,
    children: [
      {
        path: 'select-contact',
        component: ContactComponent,
      },
      {
        path: 'select-product',
        component: SelectProductComponent,
        canActivate: [contactGuard],
      },
      {
        path: 'set-discount',
        component: SetDiscountComponent,
        canActivate: [discountGuard, contactGuard],
      },

      {
        path: 'choose-payment-method',
        component: ChoosePaymentMethodComponent,
        canActivate: [contactGuard, paymentGuard],
      },
      {
        path: '**',
        redirectTo: 'select-contact',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateInvoiceRoutingModule {}
