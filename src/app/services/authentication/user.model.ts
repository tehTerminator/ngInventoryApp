import { Entity } from "../../interface/entity.interface";
import { Role } from "../../interface/role.interface";
import { HOUR } from "../../shared/constants";

export class User {
    private _id: number
    private _name: string;
    private _username: string;
    private _mobile: string;
    private _auth_token: string; 
    private _role: Role;
    private _expirationTime: number;

    public constructor(userData: UserData) {
        this._id = userData.id;
        this._name = userData.name;
        this._username = userData.username;
        this._mobile = userData.mobile;
        this._auth_token = userData.auth_token;
        this._role = userData.role;
        this._expirationTime = (new Date()).getTime() + HOUR;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get username(): string {
        return this._username;
    }

    get mobile(): string {
        return this._mobile;
    }

    get token(): string | null {
        const curr_time = (new Date()).getTime();
        if ( curr_time <= this._expirationTime ) {
            return this._auth_token;
        }
        return null;
    }

    get role(): string {
        return this._role.name;
    }

    get role_id(): number {
        return this._role.id;
    }
}

export interface UserData extends Entity {
    name: string;
    username: string;
    mobile: string;
    auth_token: string;
    role: Role;
    role_id: number;
}

export const AnonymousUser: UserData = {
    id: 0,
    name: 'Anonymous',
    username: 'anonymous',
    mobile: '',
    auth_token: '',
    role: {
      id: 0,
      name: 'Anonymous User',
      description: 'Not Authenticated User',
    },
    role_id: 0
  }