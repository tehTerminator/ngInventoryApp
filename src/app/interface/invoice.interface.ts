import { Contact } from './contact.interface';
import { Entity } from './entity.interface';

export interface Invoice extends Entity {
  id: number;
  kind: 'SALES' | 'PURCHASE';
  contact_id: number;
  contact: Contact;
  location_id: number;
  paid: boolean;
  amount: number;
  user_id: number;
  transaction: Transaction[];
}

export interface Transaction extends Entity {
  invoiceId: number;
  itemId: number;
  itemType: 'PRODUCT' | 'LEDGER' | 'BUNDLE';
  userId: number;
  quantity: number;
  rate: number;
  discount: number;
  transaction?: Transaction[];
}

export const BASE_TRANSACTION: Transaction = Object.freeze({
  id: 0,
  invoiceId: 0,
  itemId: 0,
  itemType: 'PRODUCT',
  userId: 0,
  quantity: 0,
  rate: 0,
  discount: 0,
});

export const BASE_INVOICE: Invoice = Object.freeze({
  id: 0,
  contact_id: 0,
  contact: EMPTY_CUSTOMER,
  user_id: 0,
  paid: false,
  amount: 0,
  kind: 'SALES',
  location_id: 0,
  created_at: '',
  updated_at: '',
  transaction: [],
});
