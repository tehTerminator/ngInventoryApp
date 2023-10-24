import { Entity } from "./entity.interface";

export interface StoreLocation extends Entity {
    title: string;
}

export const EMPTYLOCATION: StoreLocation = Object.freeze({
    id: 0,
    title: 'Sample Location'
});