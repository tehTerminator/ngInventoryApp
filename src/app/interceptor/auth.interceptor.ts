import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStoreService } from './../services/auth-store/auth-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authStore: AuthStoreService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authStore.user().token === null) {
      return next.handle(request);
    }

    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authStore.user().token}`
      }
    });
    return next.handle(newRequest);
  }


}
