import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';


export const productGuard: CanActivateFn = () => {

    const store: InvoiceStoreService = inject(InvoiceStoreService);
    const router: Router = inject(Router);
    const route: ActivatedRoute = inject(ActivatedRoute);

    if (store.product.value !== null) {
        return true;
    }

    const type = route.snapshot.paramMap.get('type');
    const invoiceType = type === 'sales' ? 'sales' : 'purchase';
    const url = getCreateInvoiceRoutes('SELECT_PRODUCT', invoiceType);

    return router.createUrlTree(url);
};
