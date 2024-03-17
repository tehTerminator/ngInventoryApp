import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';


export const contactGuard: CanActivateFn = () => {

    const store: InvoiceStoreService = inject(InvoiceStoreService);
    const router: Router = inject(Router);
    const route: ActivatedRoute = inject(ActivatedRoute);

    if (store.contact.id >= 0) {
        return true;
    }

    const type = route.snapshot.paramMap.get('type');
    const invoiceType = type === 'sales' ? 'sales' : 'purchase';
    const url = getCreateInvoiceRoutes('SELECT_CUSTOMER', invoiceType);

    return router.createUrlTree(url);
};
