import { Entity } from './entity.interface';

export interface User extends Entity {
    name: string;
    username: string;
    mobile: string;
}