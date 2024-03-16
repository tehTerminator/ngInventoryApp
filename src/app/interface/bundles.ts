import { Entity } from './entity.interface';

export interface Bundle extends Entity {
    title: string;
    rate: number;
    template: BundleTemplate[];
}

export interface BundleTemplate extends Entity {
    bundle_id: number;
    item_id: number;
    kind: 'PRODUCT' | 'LEDGER',
    rate: number;
    quantity: number;
}