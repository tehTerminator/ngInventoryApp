import { Entity } from './entity.interface';

export interface Bundle extends Entity {
    title: string;
    rate: number;
    templates: BundleTemplate[];
}

export interface BundleTemplate extends Entity {
    bundle_id: number;
    item_id: number;
    title: string;
    kind: 'PRODUCT' | 'LEDGER',
    rate: number;
    quantity: number;
}