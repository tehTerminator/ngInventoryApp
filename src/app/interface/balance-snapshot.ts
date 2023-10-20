import { Entity } from "./entity.interface";
import { Ledger } from './ledger';

export interface BalanceSnapshot extends Entity{
    ledger_id: number;
    ledger: Ledger;
    opening: number;
    closing: number;
}