import { Entity } from "./entity.interface";
import { LedgerGroup } from './ledger-groups';

export interface Ledger extends Entity {
  title: string;
  groupId: number;
  canReceivePayment: boolean;
  group: LedgerGroup;
}