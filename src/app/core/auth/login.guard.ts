import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si ya está autenticado, redirige al home/inicio
      this.router.navigate(['/home/inicio']);
      return false;
    }
    return true; // Si no está logueado, puede entrar al login
  }
}