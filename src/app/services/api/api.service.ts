import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private createUrl(urlData: string[]): string {
    const url = urlData.join('/');
    return `${environment.baseUrl}/${url}`;
  }

  retrieve<T>(urlData: string | string[], payload?: {[key: string]: string}) {
    let url = '';

    if (Array.isArray(urlData)) {
      url = this.createUrl([...urlData]);
    }

    else {
      url = this.createUrl(['get', urlData]);
    }

    return this.http.get<T>(url, {params: payload})
  }


  create<T>(url: string | string[], payload: {[key: string]: any}): Observable<T>{
    const theUrl  = this.createUrl([ 'create',...url]);
    return this.http.post<T>(theUrl, payload);
  }

  update<T>(url: string | string[], payload: {[key: string]: any}): Observable<T> {
    const theUrl  = this.createUrl([ 'update',...url]);
    return this.http.put<T>(theUrl, payload);
  }

  delete<T>(url: string | string[], id: number): Observable<T> {
    const theUrl  = this.createUrl([ 'delete',...url]);
    return this.http.delete<T>(`${theUrl}/'delete')}/${id}`);
  }

}
