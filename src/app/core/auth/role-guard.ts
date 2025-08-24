import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function RoleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const rol = auth.getRol();
    if (rol && allowedRoles.includes(rol)) {
      return true;
    }

    router.navigate(['/home/inicio']); // o a "unauthorized"
    return false;
  };

  
}