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

    constructor(
        private _tableName: string,
        private _updateFrequency: number) { }

    get tableName(): string {
        return this._tableName;
    }

    public init(forced = false): void {
        const currentDate = (new Date()).getTime();
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

    protected store(data: T[]): void {
        this._data.next(data);
        this.nextUpdate = (new Date()).getTime() + this._updateFrequency;
    }

    getElementById(id: number): T {
        const list = this._data.value;
        if (list.length > 0) {
            const result = list.find(x => {
                if (x.hasOwnProperty('id')) {
                    return x.id === id;
                }
                throw new Error('ID field Not Found in List');
            });
            if (!!result) {
                return result;
            }
        }
        throw new Error('Item Not Found');
    }

    get(index: number): T {
        return { ...this._data.value[index] };
    }

    getAsList(): T[] {
        return [...this._data.value];
    }

    getAsObservable(): Observable<T[]> {
        return this._data;
    }

    protected deleteItem(index: number): void {
        this._data.next(this._data.value.splice(index, 1));
        this.updateTimeStamp();
    }

    protected insert(item: T): void {
        this._data.next([...this._data.value, item]);
        this.updateTimeStamp();
    }

    protected updateItem(item: T): void {
        if (!item.hasOwnProperty('id')) {
            throw new Error(`Unique Field Does Not Exist in Provided Item`);
        }
        const list = this._data.value;
        const indexOfItemToBeReplaced = list.findIndex(x => {
            if (x.hasOwnProperty('id')) {
                return x.id === item.id;
            }
            throw new Error('No Unique Field in List');
        });
        list.splice(indexOfItemToBeReplaced, 1, item);
        this._data.next(list);
        this.updateTimeStamp();
    }

    private updateTimeStamp(): void {
        this.nextUpdate = (new Date()).getTime() + this._updateFrequency;
    }
}
