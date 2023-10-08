import { Entity } from './entity.interface';

export interface Invoice extends Entity {
    id: number;
    kind: 'SALES' | 'PURCHASE';
    contactId: number;
    locationId: number;
    paid: boolean;
    amount: number;
    userId: number;
    transactions: InvoiceTransaction[];
}
