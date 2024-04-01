import { Entity } from './entity.interface';

export interface Invoice extends Entity {
  kind: 'SALES' | 'PURCHASE';
  contact_id: number;
  location_id: number;
  paid: boolean;
  gross_amount: number;
  discount_amount: number;
  user_id: number;
  transactions: Transaction[];
}

export interface Transaction extends Entity {
  invoice_id: number;
  item_id: number;
  item_type: 'PRODUCT' | 'LEDGER' | 'BUNDLE';
  user_id: number;
  quantity: number;
  rate: number;
  transactions?: Transaction[];
}

export const BASE_TRANSACTION: Transaction = Object.freeze({
  id: 0,
  invoice_id: 0,
  item_id: 0,
  item_type: 'PRODUCT',
  user_id: 0,
  quantity: 0,
  rate: 0,
});

export const BASE_INVOICE: Invoice = Object.freeze({
  id: 0,
  contact_id: 0,
  user_id: 0,
  paid: false,
  gross_amount: 0,
  discount_amount: 0,
  kind: 'SALES',
  location_id: 0,
  created_at: '',
  updated_at: '',
  transactions: [],
});
