import { Entity } from './entity.interface';

export interface Product extends Entity {
    title: string;
    rate: number;
}    

export const EMPTY_PRODUCT: Product = Object.freeze({
    id: 0,
    title: 'EMPTY_PRODUCT',
    rate: 0,
});
