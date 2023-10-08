import {Entity} from './entity.interface';
import { Location } from './location';
import { Product } from './product';

export interface StockTransferInfo {
    location_id: number;
    product_id: number;
    location: Location;
    product: Product;
}
