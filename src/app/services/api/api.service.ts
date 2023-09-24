import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetch_data<T>(urlData: string | string[], payload: {[key: string]: string}) {
    let url = '';

    if (Array.isArray(urlData)) {
      url = this.createUrl([...urlData]);
    }

    else {
      url = this.createUrl(['get', urlData]);
    }

    return this.http.get<T>(url, {params: payload})
  }

  /**

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
  
  */
  private createUrl(urlData: string[]): string {
    const url = urlData.join('/');
    return `${environment.baseUrl}/${url}`;
  }
}
