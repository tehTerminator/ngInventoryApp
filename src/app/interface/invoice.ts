import { Contact } from './contact';
import { Entity } from './entity.interface';
import { Transaction } from './transaction';

export interface Invoice extends Entity {
    id: number;
    kind: 'sales' | 'purchase';
    contact_id: number;
    contact: Contact;
    location_id: number;
    paid: boolean;
    amount: number;
    userId: number;
    transactions: Transaction[];
}
