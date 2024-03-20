import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';
import { EMPTY_PRODUCT } from '../../../../../interface/product.interface';


export const productGuard: CanActivateFn = () => {

    const store: InvoiceStoreService = inject(InvoiceStoreService);
    const router: Router = inject(Router);
    const route: ActivatedRoute = inject(ActivatedRoute);

    if (store.selectedItem !== EMPTY_PRODUCT) {
        return true;
    }

    const type = route.snapshot.paramMap.get('type');
    const invoiceType = type === 'sales' ? 'sales' : 'purchase';
    const url = getCreateInvoiceRoutes('SELECT_PRODUCT', invoiceType);

    return router.createUrlTree(url);
};
