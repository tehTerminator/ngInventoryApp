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

@NgModule({
  declarations: [
    ContactTableComponent,
    InvoiceInfoComponent,
    PreviewInvoiceComponent,
    TransactionsTableComponent,
    PaymentInfoComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [PreviewInvoiceComponent],
})
export class SharedComponentModule {}
