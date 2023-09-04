import { Entity } from "./entity.interface";

export interface Role extends Entity {
    name: string;
    description: string;
}
