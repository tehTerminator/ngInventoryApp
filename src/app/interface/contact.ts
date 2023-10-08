import { Entity } from './entity.interface';

export interface Contact extends Entity {
  title: string;
  address: string;
  mobile: string;
  kind: 'CUSTOMER' | 'SUPPLIER';
}