import { BehaviorSubject, Observable } from 'rxjs';
import { Entity } from './../interface/entity.interface';

export abstract class BaseService {
    protected data = new BehaviorSubject<Entity[]>([]);
    protected nextUpdate = 0;
    private initialized = false;

    protected abstract fetch(): void;
    public abstract create(data: Entity): Observable<Entity>;
    public abstract update(data: Entity): Observable<Entity>;
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

    protected store(data: Entity[]): void {
        this.data.next(data);
        this.nextUpdate = (new Date()).getTime() + this._updateFrequency;
    }

    getElementById(id: number): Entity {
        const list = this.data.value;
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

    get(index: number): Entity {
        return { ...this.data.value[index] };
    }

    getAsList(): Entity[] {
        return [...this.data.value];
    }

    getAsObservable(): Observable<Entity[]> {
        return this.data;
    }

    protected deleteItem(index: number): void {
        this.data.next(this.data.value.splice(index, 1));
        this.updateTimeStamp();
    }

    protected insert(item: Entity): void {
        this.data.next([...this.data.value, item]);
        this.updateTimeStamp();
    }

    protected updateItem(item: Entity): void {
        if (!item.hasOwnProperty('id')) {
            throw new Error(`Unique Field Does Not Exist in Provided Item`);
        }
        const list = this.data.value;
        const indexOfItemToBeReplaced = list.findIndex(x => {
            if (x.hasOwnProperty('id')) {
                return x.id === item.id;
            }
            throw new Error('No Unique Field in List');
        });
        list.splice(indexOfItemToBeReplaced, 1, item);
        this.data.next(list);
        this.updateTimeStamp();
    }

    private updateTimeStamp(): void {
        this.nextUpdate = (new Date()).getTime() + this._updateFrequency;
    }
}
