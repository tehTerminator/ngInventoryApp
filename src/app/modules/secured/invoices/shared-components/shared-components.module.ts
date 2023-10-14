import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { InvoiceInfoComponent } from './invoice-info/invoice-info.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

@NgModule({
    declarations: [
        CustomerTableComponent,
        InvoiceInfoComponent,
        PreviewInvoiceComponent,
        TransactionsTableComponent,
        PaymentInfoComponent
    ],
    imports: [CommonModule, MatIconModule],
    exports: [PreviewInvoiceComponent]
})
export class SharedComponentModule { }