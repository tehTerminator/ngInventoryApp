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
  const url = getCreateInvoiceRoutes('select-customer', type);

  return router.createUrlTree(url);
};
