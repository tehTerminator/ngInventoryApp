import { Entity } from "./entity.interface";

export interface GeneralItem extends Entity {
    title: string;
    type: 'PRODUCT'| 'LEDGER' | 'BUNDLE';
    rate: number;
}