import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, debounceTime, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private createUrl(prefix: string, urlData: string[] | string): string {
    let url = urlData;
    if (Array.isArray(urlData)) {
      url = urlData.join('/')
    }
    return `${environment.baseUrl}/${prefix}/${url}`;
  }

  retrieve<T>(urlData: string | string[], payload?: {[key: string]: string}) {
    const url = this.createUrl('get', urlData);
    return this.http.get<T>(url, {params: payload}).pipe(debounceTime(this.randomTime()),retry(3))
  }


  create<T>(url: string | string[], payload: {[key: string]: any}): Observable<T>{
    const theUrl  = this.createUrl('create', url);
    return this.http.post<T>(theUrl, payload);
  }

  update<T>(url: string | string[], payload: {[key: string]: any}): Observable<T> {
    const theUrl  = this.createUrl('update', url);
    return this.http.put<T>(theUrl, payload);
  }

  delete<T>(url: string | string[], id: number): Observable<T> {
    const theUrl  = this.createUrl('destroy', url);
    return this.http.delete<T>(`${theUrl}/${id}`);
  }

  private randomTime(): number {
    return 100 + Math.floor(Math.random() * 100);
  }

}
