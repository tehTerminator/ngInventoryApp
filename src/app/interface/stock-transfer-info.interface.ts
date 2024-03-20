import {Entity} from './entity.interface';
import { StoreLocation } from './location.interface';
import { Product } from './product.interface';

export interface StockTransferInfo extends Entity {
    location_id: number;
    product_id: number;
    location: StoreLocation;
    product: Product;
}
