import { BehaviorSubject, Observable } from 'rxjs';
import { Entity } from './../interface/entity.interface';

export abstract class BaseService<T extends Entity> {
  protected _data = new BehaviorSubject<T[]>([]);
  protected nextUpdate = 0;
  private initialized = false;

  protected abstract fetch(): void;
  public abstract create(data: T): Observable<T>;
  public abstract update(data: T): Observable<T>;
  public abstract delete(id: number): Observable<any>;

  constructor(private _table: string, private _updateFrequency: number) {}

  get table(): string {
    return this._table;
  }

  public init(forced = false): void {
    const currentDate = new Date().getTime();
    if (!forced) {
      if (this.nextUpdate > currentDate) {
        return;
      }
    }

    if (this.initialized) {
      return; // Prevents Multiple Init Calls
    }

    this.initialized = true;
    this.fetch();
  }

  store(data: T[]): void {
    this._data.next(data);
    this.updateTimeStamp();
  }

  getElementById(id: number): T {
    const item = this.getAsList().find(x => x.id === +id);
    if (!!item) {
      return item;
    }
    throw new Error(this.table + ' Not Found with Id' + id);
  }

  get(index: number): T {
    return this.getAsList()[+index];
  }

  getAsList(): T[] {
    return [...this._data.value];
  }

  getAsObservable(): Observable<T[]> {
    return this._data;
  }

  protected deleteItem(index: number): void {
    this.store(this.getAsList().splice(index, 1));
  }

  protected insert(item: T): void {
    this.store([...this.getAsList(), item]);
  }

  protected updateItem(item: T): void {
    if (!item.hasOwnProperty('id')) {
      throw new Error(`Unique Field Does Not Exist in Provided Item`);
    }
    const list = this.getAsList();
    const indexOfItemToBeReplaced = list.findIndex((x) => {
      if (x.hasOwnProperty('id')) {
        return x.id === item.id;
      }
      throw new Error('No Unique Field in List');
    });
    list.splice(indexOfItemToBeReplaced, 1, item);
    this.store(list);
    this.updateTimeStamp();
  }

  private updateTimeStamp(): void {
    this.nextUpdate = new Date().getTime() + this._updateFrequency;
  }
}
