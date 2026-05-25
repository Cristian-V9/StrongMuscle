import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Rutas estrictamente privadas: si no hay sesión, redirige a /login. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};

/** Rutas con versión bloqueada: si no hay sesión, redirige a la versión "-bloqueada". */
export function gatedGuard(lockedPath: string): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.isLoggedIn()) return true;
    router.navigate([lockedPath]);
    return false;
  };
}
