export class User {
  private _id: string;
  private _displayName: string;
  private _email: string;
  private _idToken: string;
  // private _role: Role;
  private _expirationTime: number;

  public constructor(userData: UserData) {
    this._id = userData.localId;
    this._displayName = userData.displayName;
    this._email = userData.email;
    this._idToken = userData.idToken;
    this._expirationTime = new Date().getTime() + parseInt(userData.expiresIn);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._displayName;
  }

  get username(): string {
    return this._email;
  }

  get token(): string | null {
    const curr_time = new Date().getTime();
    if (curr_time <= this._expirationTime) {
      return this._idToken;
    }
    return null;
  }
}

export interface UserData {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  updated_at: number;
}

export const AnonymousUser = {
  localId: '',
  email: '',
  displayName: '',
  idToken: '',
  registered: false,
  refreshToken: '',
  expiresIn: '',
  updated_at: 0,
};
