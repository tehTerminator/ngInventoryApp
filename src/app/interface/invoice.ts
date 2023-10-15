import { Contact } from './contact';
import { Entity } from './entity.interface';
import { Transaction } from './transaction';

export interface Invoice extends Entity {
    id: number;
    kind: 'sales' | 'purchase';
    contactId: number;
    contact: Contact;
    locationId: number;
    paid: boolean;
    amount: number;
    userId: number;
    transactions: Transaction[];
}
