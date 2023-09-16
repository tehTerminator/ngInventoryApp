import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from './../services/auth-store.service';
import { AuthState } from '../interface/auth-state';


export const authGuard: CanActivateFn = (route, state) => {
  const authStore: AuthStoreService = inject(AuthStoreService);
  const router: Router = inject(Router);

  if (authStore.state === AuthState.LOGGED_IN) {
    return true;
  }

  return router.createUrlTree(['']);
};
