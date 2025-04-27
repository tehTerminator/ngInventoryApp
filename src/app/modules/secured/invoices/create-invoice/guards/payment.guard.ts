import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';


export const paymentGuard: CanActivateFn = () => {

    const store: InvoiceStoreService = inject(InvoiceStoreService);
    const router: Router = inject(Router);

    if (store.invoice().transactions.length > 0) {
        return true;
    }

    console.log('Transactions length', store.invoice().transactions);

    const type = store.kind().toLowerCase() === 'sales' ? 'sales' : 'purchase';
    const url = getCreateInvoiceRoutes('select-product', type);
    return router.createUrlTree(url);
};
