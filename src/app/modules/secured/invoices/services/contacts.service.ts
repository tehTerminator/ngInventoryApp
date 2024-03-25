import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../../../../class/BaseService';
import { Contact } from '../../../../interface/contact.interface';
import { ApiService } from '../../../../services/api/api.service';
import { HOUR } from '../../../../interface/collection.interface';

@Injectable()
export class ContactsService extends BaseService<Contact> {
  constructor(private api: ApiService) {
    super('contacts', HOUR);
  }

  protected fetch(): void {
    this.api
      .retrieve<Contact[]>(this.table)
      .subscribe((customers) => this.store(customers));
  }

  public create(customer: Contact): Observable<Contact> {
    return this.api.create<Contact>('contact', customer).pipe(
      tap((response) => {
        this.insert(response);
      }),
      catchError((error) => {
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
