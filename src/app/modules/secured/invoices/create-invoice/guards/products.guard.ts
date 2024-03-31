import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { getCreateInvoiceRoutes } from '../functions';
import { EMPTY_PRODUCT } from '../../../../../interface/product.interface';


export const productGuard: CanActivateFn = () => {

    const store: InvoiceStoreService = inject(InvoiceStoreService);
    const router: Router = inject(Router);

    if (store.selectedItem !== EMPTY_PRODUCT) {
        return true;
    }

    console.log('EMpty Product');

    const type = store.kind.toLowerCase() === 'sales' ? 'sales' : 'purchase';
    const url = getCreateInvoiceRoutes('select-product', type);

    return router.createUrlTree(url);
};
