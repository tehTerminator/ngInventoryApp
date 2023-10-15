import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStoreService } from './../services/auth-store/auth-store.service';
import { AuthState } from './../interface/auth-state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token: string | null = null;

  constructor(private authStore: AuthStoreService) {
    this.authStore.user.subscribe({
      next: (user) => this.token = user.token
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.token === null) {
      return next.handle(request);
    }

    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(newRequest);
  }


}
