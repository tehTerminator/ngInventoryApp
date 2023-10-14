import { Entity } from './entity.interface';
import { Transaction } from './transaction';

export interface Invoice extends Entity {
    id: number;
    kind: 'sales' | 'purchase';
    contactId: number;
    locationId: number;
    paid: boolean;
    amount: number;
    userId: number;
    transactions: Transaction[];
}
