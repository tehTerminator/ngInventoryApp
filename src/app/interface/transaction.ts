import { Entity } from './entity.interface';
import { Product } from './product';

export interface Transaction extends Entity {
    invoice_id: number;
    product_id: number;
    user_id: number;
    narration: string;
    quantity: number;
    rate: number;
    gst: number;
    amount: number;
    product: Product;
}
