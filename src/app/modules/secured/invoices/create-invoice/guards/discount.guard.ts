import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';

export const discountGuard: CanActivateFn = () => {
  const store: InvoiceStoreService = inject(InvoiceStoreService);
  const router: Router = inject(Router);

  if (store.snapshot.kind === 'SALES') {
    return true;
  }

  const type = store.kind.toLowerCase() === 'sales' ? 'sales' : 'purchase';
  let url: string[] = [];

  if (store.snapshot.gross_amount > 0) {
    url = getCreateInvoiceRoutes('choose-payment-method', type);
  } else {
    url = getCreateInvoiceRoutes('select-customer', type);
  }

  return router.createUrlTree(url);
};
