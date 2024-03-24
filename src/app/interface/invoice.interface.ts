import { Entity } from './entity.interface';

export interface Invoice extends Entity {
  kind: 'SALES' | 'PURCHASE';
  contact_id: number;
  location_id: number;
  paid: boolean;
  amount: number;
  user_id: number;
  transactions: Transaction[];
}

export interface Transaction extends Entity {
  invoiceId: number;
  itemId: number;
  itemType: 'PRODUCT' | 'LEDGER' | 'BUNDLE';
  userId: number;
  quantity: number;
  rate: number;
  discount: number;
  transactions?: Transaction[];
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
  user_id: 0,
  paid: false,
  amount: 0,
  kind: 'SALES',
  location_id: 0,
  created_at: '',
  updated_at: '',
  transactions: [],
});
