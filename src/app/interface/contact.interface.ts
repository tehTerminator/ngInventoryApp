import { Entity } from './entity.interface';

export interface Contact extends Entity {
  title: string;
  address: string;
  mobile: string;
  kind: 'CUSTOMER' | 'SUPPLIER';
  ledger_id: number;
}

export const EMPTY_CONTACT: Contact = Object.freeze({
  id: 0,
  title: 'NOT SELECTED',
  address: 'NOT SELECTED',
  mobile: '',
  kind: 'CUSTOMER',
  ledger_id: 2,
})

