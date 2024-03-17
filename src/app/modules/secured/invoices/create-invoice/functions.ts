export function getCreateInvoiceRoutes(
  urlType:
    | 'SELECT_CUSTOMER'
    | 'SELECT_PRODUCT'
    | 'CREATE_TRANSACTION'
    | 'FINAL_SUBMIT',
  invoiceType: 'sales' | 'purchase'
) {
  return ['/auth', 'invoices', 'create', invoiceType, urlType];
}
