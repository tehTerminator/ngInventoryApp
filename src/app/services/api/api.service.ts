import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: HttpClient) { }

  get<T>(url: string | string[], payload: {[key: string]: string}) {
    const theUrl  = this.createUrl([...url]);
    this.client.get<T>(theUrl, {params: payload});
  }

  create<Type>(url: string | string[], payload: {[key: string]: any}): Observable<Type>{
    const theUrl  = this.createUrl([...url]);
    return this.client.put<Type>(theUrl, payload);
  }

  update<Type>(url: string | string[], payload: {[key: string]: any}): Observable<Type> {
    const theUrl  = this.createUrl([...url]);
    return this.client.post<Type>(theUrl, payload);
  }

  delete<Type>(url: string | string[], id: number): Observable<Type> {
    const theUrl  = this.createUrl([...url]);
    return this.client.delete<Type>(`${theUrl, 'delete')}/${id}`);
  }

  private createUrl(urlData: string[]) {
    const url = urlData.join('/');
    return `${environment.baseUrl}/${url}`;
  }
}
