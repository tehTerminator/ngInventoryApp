import { Entity } from './entity.interface';

export interface Product extends Entity {
    title: string;
    rate: number;
}    
