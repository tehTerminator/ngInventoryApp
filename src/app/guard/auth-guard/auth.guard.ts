import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from './../../services/auth-store/auth-store.service';
import { AuthState } from './../../interface/auth-state';


export const authGuard: CanActivateFn = () => {
  const authStore: AuthStoreService = inject(AuthStoreService);
  const router: Router = inject(Router);

  const authState = authStore.state_value;

  if (authState === AuthState.LOGGED_IN) {
    console.log('Returing True');
    return true;
  }

  console.log('Returning Tree');
  return router.createUrlTree(['']);
};
