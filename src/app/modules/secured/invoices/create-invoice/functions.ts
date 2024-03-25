export function getCreateInvoiceRoutes(
  urlType:
    | 'select-customer'
    | 'select-product'
    | 'create-transaction'
    | 'choose-payment-method',
  invoiceType: 'sales' | 'purchase'
) {
  return ['/auth', 'invoices', 'create', invoiceType, urlType];
}
