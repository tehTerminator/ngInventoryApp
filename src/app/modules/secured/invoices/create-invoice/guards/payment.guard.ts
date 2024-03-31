import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';


export const paymentGuard: CanActivateFn = () => {

    const store: InvoiceStoreService = inject(InvoiceStoreService);
    const router: Router = inject(Router);

    if (store.snapshot.transactions.length > 0) {
        return true;
    }

    console.log('Transactions length', store.snapshot.transactions);

    const type = store.kind.toLowerCase() === 'sales' ? 'sales' : 'purchase';
    const url = getCreateInvoiceRoutes('select-product', type);
    return router.createUrlTree(url);
};
