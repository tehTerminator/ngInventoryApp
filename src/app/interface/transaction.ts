import { Entity } from './entity.interface';
import { Product } from './product';

export interface Transaction extends Entity {
    invoice_id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    rate: number;
    amount: number;
    product: Product;
}
