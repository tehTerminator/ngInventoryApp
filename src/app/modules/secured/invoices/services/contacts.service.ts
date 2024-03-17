import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../../../../class/BaseService';
import { Contact } from '../../../../interface/contact';
import { ApiService } from '../../../../services/api/api.service';

@Injectable()
export class ContactsService extends BaseService<Contact> {

    constructor(private api: ApiService) {
        super('contacts', 60);
    }

    protected fetch(): void {
        this.api.retrieve<Contact[]>(this.table)
        .subscribe(customers => this.store(customers));
    }

    public create(customer: Contact): Observable<Contact> {
        return this.api.create<Contact>([this.table], customer)
        .pipe(
            tap(response => {
                this.insert(response);
            }),
            catchError(error => {
                console.log(error);
                throw new Error('Unable to Create New Customer');
            })
        );
    }

    public update(customer: Contact): Observable<Contact> {
        throw new Error('Method not implemented.');
    }
    public delete(id: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
