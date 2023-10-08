import { Entity } from './entity.interface';
import { ProductGroup } from './product-group';

export interface Product extends Entity {
    title: string;
    group: ProductGroup;
}
