import { Entity } from './entity.interface';

export interface Contact extends Entity {
  title: string;
  address: string;
  mobile: string;
  kind: 'CUSTOMER' | 'SUPPLIER';
}

export const EMPTY_CONTACT: Contact = Object.freeze({
  id: 0,
  title: 'NOT SELECTED',
  address: 'NOT SELECTED',
  mobile: '',
  kind: 'CUSTOMER',
  created_at: '',
  updated_at: '',
})

