import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { InvoiceInfoComponent } from './invoice-info/invoice-info.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CashierNameComponent } from './cashier-name/cashier-name.component';
import { ChoosePaymentMethodComponent } from './choose-payment-method/choose-payment-method.component';
import { PrepaidVouchersComponent } from './choose-payment-method/prepaid-vouchers/prepaid-vouchers.component';
import { RecentPaymentBtnComponent } from './choose-payment-method/recent-payment-btn/recent-payment-btn.component';
import { SelectLedgerFormComponent } from './choose-payment-method/select-ledger-form/select-ledger-form.component';
import { CoreModule } from 'src/app/modules/core/core.module';
import { UdhaarPaymentBtnComponent } from './choose-payment-method/udhaar-payment-btn/udhaar-payment-btn.component';

@NgModule({
  declarations: [
    ContactTableComponent,
    InvoiceInfoComponent,
    PreviewInvoiceComponent,
    TransactionsTableComponent,
    PaymentInfoComponent,
    CashierNameComponent,
    ChoosePaymentMethodComponent,
    PrepaidVouchersComponent,
    RecentPaymentBtnComponent,
    SelectLedgerFormComponent,
    UdhaarPaymentBtnComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [PreviewInvoiceComponent, ChoosePaymentMethodComponent],
})
export class SharedComponentModule {}
